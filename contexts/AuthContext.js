"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  clearStoredSession,
  DEMO_EMAIL,
  DEMO_PASSWORD,
  readStoredSession,
  writeStoredSession,
} from "../lib/session";

const AuthContext = createContext(null);

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setSession(readStoredSession());
    setIsReady(true);
  }, []);

  const persist = useCallback((next) => {
    writeStoredSession(next);
    setSession(next);
  }, []);

  const loginWithEmailPassword = useCallback(
    (email, password) => {
      const e = normalizeEmail(email);
      if (e === normalizeEmail(DEMO_EMAIL) && password === DEMO_PASSWORD) {
        const next = {
          provider: "email",
          user: {
            name: "Test User",
            email: DEMO_EMAIL,
            picture: null,
          },
          loggedInAt: new Date().toISOString(),
        };
        persist(next);
        return { ok: true };
      }
      return { ok: false, error: "Invalid email or password." };
    },
    [persist]
  );

  const registerWithForm = useCallback(
    (name, email, password) => {
      if (password !== DEMO_PASSWORD) {
        return {
          ok: false,
          error: "For this demo, use password 1234.",
        };
      }
      const e = normalizeEmail(email);
      if (!e || !name.trim()) {
        return { ok: false, error: "Please enter your name and email." };
      }
      const next = {
        provider: "email",
        user: {
          name: name.trim(),
          email: e,
          picture: null,
        },
        loggedInAt: new Date().toISOString(),
      };
      persist(next);
      return { ok: true };
    },
    [persist]
  );

  const loginWithGoogleProfile = useCallback(
    (profile) => {
      const next = {
        provider: "google",
        user: {
          name: profile.name || profile.email || "User",
          email: profile.email,
          picture: profile.picture || null,
        },
        loggedInAt: new Date().toISOString(),
      };
      persist(next);
    },
    [persist]
  );

  const logout = useCallback(() => {
    clearStoredSession();
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({
      user: session?.user ?? null,
      provider: session?.provider ?? null,
      isAuthenticated: !!session?.user,
      isReady,
      loginWithEmailPassword,
      registerWithForm,
      loginWithGoogleProfile,
      logout,
    }),
    [
      session,
      isReady,
      loginWithEmailPassword,
      registerWithForm,
      loginWithGoogleProfile,
      logout,
    ]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
