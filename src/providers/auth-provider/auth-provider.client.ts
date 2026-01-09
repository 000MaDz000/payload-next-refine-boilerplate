"use client";

import type { AuthProvider } from "@refinedev/core";

const API_URL = "/api";

export const authProviderClient: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Payload sets httpOnly cookie by default?
        // JS cannot read httpOnly cookie.
        // But Refine needs to know if logged in.
        // Payload returns { message: ..., user: ..., token: ... } (if enabled)
        // If we use cookies (default), we don't need to save token manually if browser handles it.
        // But for `check`, we need to know.

        // We can store the user in a cookie or localStorage for `getIdentity`.
        // Or simply rely on `check` hitting `/api/users/me`.

        return {
          success: true,
          redirectTo: "/",
        };
      }

      const error = await response.json();
      return {
        success: false,
        error: {
          name: "LoginError",
          message: error.errors?.[0]?.message || "Invalid credentials",
        }
      }
    } catch (e) {
      return {
        success: false,
        error: {
          name: "LoginError",
          message: "Network error",
        },
      };
    }
  },
  logout: async () => {
    await fetch(`${API_URL}/users/logout`, { method: "POST" });
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    try {
      const response = await fetch(`${API_URL}/users/me`);
      if (response.ok) {
        const data = await response.json();

        if (data && data.user) {
          return {
            authenticated: true,
          };
        }
      }

      // If response is not ok or data.user doesn't exist, return unauthenticated
      return {
        authenticated: false,
        logout: true,
        redirectTo: "/login",
      };
    } catch (error) {
      // On network error, also return unauthenticated
      return {
        authenticated: false,
        logout: true,
        redirectTo: "/login",
      };
    }
  },
  getPermissions: async () => {
    // Fetch from /me
    const response = await fetch(`${API_URL}/users/me`);
    if (response.ok) {
      const data = await response.json();
      return data.user?.roles || [];
    }
    return null;
  },
  getIdentity: async () => {
    const response = await fetch(`${API_URL}/users/me`);
    if (response.ok) {
      const data = await response.json();
      return data.user;
    }
    return null;
  },
  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },
};
