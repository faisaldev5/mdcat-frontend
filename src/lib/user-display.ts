import type { User } from "@/types/user";

// =============================================================================
// User Display Utilities
// =============================================================================
// Shared helpers for deriving a human-readable display name and initials
// from the User object. Used by the sidebar, topbar, dashboard hero, and
// any future component that needs to show the user's name.
//
// Priority order for display name:
//   1. display_name  (if it looks like a real name, not a username/email)
//   2. first_name + last_name
//   3. first_name
//   4. display_name  (fallback to whatever WordPress stored)
//   5. "Student"     (absolute fallback)

/**
 * Check if a string looks like a username or email rather than a real name.
 * Usernames often contain dots, @, or are a single lowercase token with
 * no spaces (e.g. "fakhir.mdcatinsecond", "admin").
 */
function looksLikeUsername(value: string): boolean {
  // Contains @ → likely email
  if (value.includes("@")) return true;
  // Contains . and no space → likely username (e.g. "fakhir.mdcatinsecond")
  if (value.includes(".") && !value.includes(" ")) return true;
  return false;
}

/**
 * Resolve the best human-readable display name for a user.
 *
 * Priority:
 *   1. display_name (if it doesn't look like a username/email)
 *   2. first_name + last_name (if both are non-empty)
 *   3. first_name alone
 *   4. display_name (even if it looks like a username — better than nothing)
 *   5. "Student" (absolute fallback)
 */
export function getUserDisplayName(user: User | null | undefined): string {
  if (!user) return "Student";

  const displayName = user.display_name?.trim();
  const firstName = user.first_name?.trim();
  const lastName = user.last_name?.trim();

  // 1. display_name is a real name (has a space, no dots/@ patterns)
  if (displayName && !looksLikeUsername(displayName)) {
    return displayName;
  }

  // 2. first_name + last_name
  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  }

  // 3. first_name alone
  if (firstName) {
    return firstName;
  }

  // 4. display_name as-is (even if it looks like a username)
  if (displayName) {
    return displayName;
  }

  // 5. Absolute fallback
  return "Student";
}

/**
 * Derive initials from a name string.
 *
 * Examples:
 *   "Fakhir Khan"     → "FK"
 *   "Ali Hassan Raza" → "AR" (first + last)
 *   "Fakhir"          → "F"
 *   null / undefined  → "S" (for "Student")
 */
export function getUserInitials(user: User | null | undefined): string {
  const name = getUserDisplayName(user);
  const parts = name.trim().split(/\s+/);

  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  return parts[0][0]?.toUpperCase() || "S";
}
