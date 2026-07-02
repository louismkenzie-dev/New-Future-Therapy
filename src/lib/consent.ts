"use client";

import { useSyncExternalStore } from "react";

/* Cookie/analytics consent (UK GDPR + PECR). Strictly-necessary cookies need
   no consent; the only optional tracking on the site is Mux Data video
   analytics, which is gated on an explicit "all" choice. The choice is kept
   in localStorage and broadcast via a window event so every player and the
   banner stay in sync without a provider. */

export type CookieConsent = "all" | "essential";

const STORAGE_KEY = "nft-cookie-consent";
export const CONSENT_CHANGED_EVENT = "nft-consent-changed";
export const OPEN_COOKIE_SETTINGS_EVENT = "nft-open-cookie-settings";

export function getStoredConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "all" || value === "essential" ? value : null;
  } catch {
    return null;
  }
}

export function setStoredConsent(value: CookieConsent): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* Private-mode storage failures fall back to session-only consent. */
  }
  window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT));
}

export function openCookieSettings(): void {
  window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT));
}

function subscribe(onStoreChange: () => void): () => void {
  window.addEventListener(CONSENT_CHANGED_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(CONSENT_CHANGED_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

/** True only when the visitor has explicitly accepted analytics cookies. */
export function useAnalyticsConsent(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => getStoredConsent() === "all",
    () => false
  );
}
