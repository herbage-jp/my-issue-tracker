export async function getTranslation(locale: string) {
  let translations: Record<string, string>;
  if (locale.startsWith('zh')) {
    translations = (await import('./zh.json')).default;
  } else {
    translations = (await import('./en.json')).default;
  }
  return (key: string) => translations[key] || key;
}
