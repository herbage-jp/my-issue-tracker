"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export type Translations = Record<string, string | Record<string, string>>;

export function useClientTranslation() {
  const pathname = usePathname();
  // Extract locale from the pathname (first segment)
  const locale = pathname.split("/")[1] || "en-US";
  // Always initialize t as a function that returns the key
  const [t, setT] = useState<(key: string) => string>(() => (key: string) => key);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        let translations: Translations;
        if (locale.startsWith("zh")) {
          translations = (await import("@/app/i18n/zh.json")).default;
        } else {
          translations = (await import("@/app/i18n/en.json")).default;
        }
        if (isMounted) {
          setT(() => (key: string) => {
            const value = key.split('.').reduce<any>((obj, k) => (obj && obj[k] !== undefined ? obj[k] : key), translations);
            return typeof value === 'string' ? value : key;
          });
        }
      } catch (e) {
        // If import fails, keep t as identity function
        if (isMounted) setT(() => (key: string) => key);
      }
    })();
    return () => { isMounted = false; };
  }, [locale]);

  return { t, locale };
}

