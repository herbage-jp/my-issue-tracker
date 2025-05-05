"use client";
import { useEffect, useState } from "react";

export type Translations = Record<string, string | Record<string, string>>;

export function useClientTranslation() {
  const [locale, setLocale] = useState("en-US");
  const [t, setT] = useState<(key: string) => string>(() => (key: string) => key);

  useEffect(() => {
    // Try to extract locale from the current path if running in the browser
    if (typeof window !== "undefined") {
      const pathname = window.location.pathname;
      const detected = pathname.split("/")[1] || "en-US";
      setLocale(detected);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      let translations: Translations;
      if (locale.startsWith("zh")) {
        translations = (await import("@/app/i18n/zh.json")).default;
      } else {
        translations = (await import("@/app/i18n/en.json")).default;
      }
      if (isMounted) {
        setT(() => (key: string) => {
          // Support nested keys like 'navbar.dashboard'
          return key.split('.').reduce<any>((obj, k) => (obj && obj[k] !== undefined ? obj[k] : key), translations);
        });
      }
    })();
    return () => { isMounted = false; };
  }, [locale]);

  return { t, locale };
}
