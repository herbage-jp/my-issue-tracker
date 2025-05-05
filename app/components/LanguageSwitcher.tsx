"use client";

import { usePathname, useRouter } from "next/navigation";
import { Select } from "@radix-ui/themes";

const LOCALES = [
  { code: "en-US", label: "English" },
  { code: "zh-TW", label: "繁體中文" },
];

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  // Extract current locale from pathname (first segment)
  const pathSegments = pathname.split("/");
  const currentLocale = LOCALES.find(l => l.code === pathSegments[1]) ? pathSegments[1] : "en-US";

  function onChange(newLocale: string) {
    if (newLocale === currentLocale) return;
    // Replace the first segment with the new locale
    pathSegments[1] = newLocale;
    const newPath = pathSegments.join("/") || "/";
    router.push(newPath);
  }

  return (
    <Select.Root value={currentLocale} onValueChange={onChange} size="2">
      <Select.Trigger aria-label="Language" />
      <Select.Content>
        {LOCALES.map((locale) => (
          <Select.Item key={locale.code} value={locale.code}>
            {locale.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}
