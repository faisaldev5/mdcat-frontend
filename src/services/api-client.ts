import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";
import { useAuthStore } from "@/stores/auth.store";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { ROUTES } from "@/constants/routes";
import type { ApiError, ApiErrorResponse } from "@/types/api";
import type { RefreshResponse } from "@/types/user";

// =============================================================================
// API Client
// =============================================================================
// Single Axios instance for all API calls.
// - Request interceptor: injects JWT access token
// - Response interceptor: catches 401, triggers silent refresh, retries

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 30000,
});

// ---------------------------------------------------------------------------
// Request Interceptor — inject Authorization header
// ---------------------------------------------------------------------------

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { accessToken } = useAuthStore.getState();

    if (accessToken) {
      if (config.headers && typeof config.headers.set === 'function') {
        config.headers.set('Authorization', `Bearer ${accessToken}`);
      } else {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ---------------------------------------------------------------------------
// Response Interceptor — handle 401 with silent token refresh
// ---------------------------------------------------------------------------

/**
 * Refresh state management.
 * Only one refresh request at a time. Concurrent 401s queue behind the
 * first refresh attempt.
 */
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null) {
  failedQueue.forEach((promise) => {
    if (token) {
      promise.resolve(token);
    } else {
      promise.reject(error);
    }
  });
  failedQueue = [];
}

import { getRefreshTokenCookie, deleteRefreshTokenCookie } from "@/lib/auth-cookies";

apiClient.interceptors.response.use(
  // Success — pass through
  (response) => response,

  // Error — handle 401 with token refresh
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Only attempt refresh for 401 errors that haven't been retried
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(normalizeError(error));
    }

    // Don't refresh if the failed request was itself a refresh or login
    const url = originalRequest.url || "";
    if (
      url.includes(API_ENDPOINTS.AUTH_REFRESH) ||
      url.includes(API_ENDPOINTS.AUTH_LOGIN)
    ) {
      return Promise.reject(normalizeError(error));
    }

    // If a refresh is already in progress, queue this request
    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        if (originalRequest.headers && typeof originalRequest.headers.set === 'function') {
          originalRequest.headers.set('Authorization', `Bearer ${token}`);
        } else {
          originalRequest.headers.Authorization = `Bearer ${token}`;
        }
        return apiClient(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const refreshToken = getRefreshTokenCookie();

      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await axios.post<{
        success: boolean;
        data: RefreshResponse;
      }>(`${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.AUTH_REFRESH}`, {
        refresh_token: refreshToken,
      });

      const { access_token } = response.data.data;

      // Update the auth store with the new token
      useAuthStore.getState().updateToken(access_token);

      // Retry all queued requests with the new token
      processQueue(null, access_token);

      // Retry the original request
      if (originalRequest.headers && typeof originalRequest.headers.set === 'function') {
        originalRequest.headers.set('Authorization', `Bearer ${access_token}`);
      } else {
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
      }

      return apiClient(originalRequest);
    } catch (refreshError) {
      // Refresh failed — clear auth and redirect to login
      processQueue(refreshError, null);
      useAuthStore.getState().clearAuth();

      if (typeof window !== "undefined") {
        deleteRefreshTokenCookie();
        window.location.href = `${ROUTES.LOGIN}?redirect=${encodeURIComponent(window.location.pathname)}`;
      }

      return Promise.reject(normalizeError(error));
    } finally {
      isRefreshing = false;
    }
  }
);

// ---------------------------------------------------------------------------
// Error Normalization
// ---------------------------------------------------------------------------

/**
 * Transform Axios errors into a consistent ApiError shape.
 */
function normalizeError(error: AxiosError<ApiErrorResponse>): ApiError {
  if (error.response?.data) {
    const data = error.response.data;
    return {
      code: data.code || "unknown_error",
      message: data.message || "An unexpected error occurred.",
      status: error.response.status,
      errors: data.errors || {},
    };
  }

  if (error.request) {
    return {
      code: "network_error",
      message: "Unable to connect to the server. Please check your connection.",
      status: 0,
      errors: {},
    };
  }

  return {
    code: "request_error",
    message: error.message || "An unexpected error occurred.",
    status: 0,
    errors: {},
  };
}

// ---------------------------------------------------------------------------
// Convenience request methods
// ---------------------------------------------------------------------------

/**
 * Type-safe GET request.
 */
export async function apiGet<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await apiClient.get<{ success: boolean; data: T }>(
    url,
    config
  );
  return response.data.data;
}

/**
 * Type-safe POST request.
 */
export async function apiPost<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await apiClient.post<{ success: boolean; data: T }>(
    url,
    data,
    config
  );
  return response.data.data;
}

export default apiClient;

// =============================================================================
// Public API Client (no auth interceptors)
// =============================================================================
// A separate Axios instance for public endpoints (subjects, chapters,
// collections) that do NOT require authentication.
//
// Why this exists:
// The hosting provider's CDN/WAF (nginx on Hostinger) inspects the
// Authorization header on all incoming requests. When the header contains
// a token the CDN considers invalid, it returns a 400 Bad Request HTML
// page before the request ever reaches WordPress. This causes intermittent
// failures when an authenticated user navigates to public content pages
// (e.g. Q-Bank), because the main apiClient's request interceptor
// automatically attaches the Bearer token to every request.
//
// By using a clean Axios instance without auth interceptors for public
// endpoints, we avoid triggering the CDN's token inspection entirely.

export const publicApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 30000,
});
