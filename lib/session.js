/** Browser session persisted without backend (localStorage). */

export const SESSION_STORAGE_KEY = "aarogya-sakhi-session";

/** Demo email/password — no database. */
export const DEMO_EMAIL = "test@gmail.com";
export const DEMO_PASSWORD = "1234";

export function readStoredSession() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data?.user?.email) return null;
    return data;
  } catch {
    return null;
  }
}

export function writeStoredSession(session) {
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function clearStoredSession() {
  localStorage.removeItem(SESSION_STORAGE_KEY);
}
