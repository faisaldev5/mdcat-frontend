"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "@/stores/auth.store";
import { authService } from "@/services/auth.service";
import { Spinner } from "@/components/shared/spinner";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import type { RefreshResponse } from "@/types/user";

import {
  getRefreshTokenCookie,
  deleteRefreshTokenCookie,
} from "@/lib/auth-cookies";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isRestoring, setIsRestoring] = useState(true);
  const { setAuth, clearAuth } = useAuthStore();

  useEffect(() => {
    const restoreSession = async () => {
      const refreshToken = getRefreshTokenCookie();

      if (!refreshToken) {
        setIsRestoring(false);
        return;
      }

      try {
        // Step 1: Proactively refresh the access token.
        // On hard refresh (F5), Zustand is empty — there is no access token.
        // Instead of calling /auth/me without a token (which returns 401 and
        // triggers the response interceptor's silent refresh), we refresh the
        // token directly here. This avoids the 401 entirely.
        const refreshResponse = await axios.post<{
          success: boolean;
          data: RefreshResponse;
        }>(`${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.AUTH_REFRESH}`, {
          refresh_token: refreshToken,
        });

        const { access_token } = refreshResponse.data.data;

        // Store the token in Zustand so the request interceptor can use it.
        useAuthStore.getState().updateToken(access_token);

        // Step 2: Fetch the user profile with the valid token.
        // The request interceptor will now attach the token automatically.
        const user = await authService.me();

        setAuth(access_token, user);
      } catch {
        // Refresh failed (expired, revoked, etc.) — clear everything.
        clearAuth();
        deleteRefreshTokenCookie();
      } finally {
        setIsRestoring(false);
      }
    };

    restoreSession();
  }, [setAuth, clearAuth]);

  if (isRestoring) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background">
        <Spinner size="lg" />
        <p className="mt-4 text-sm text-muted-foreground animate-pulse">Restoring session...</p>
      </div>
    );
  }

  return <>{children}</>;
}
