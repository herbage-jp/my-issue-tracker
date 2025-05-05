export async function getTranslation(locale: string) {
  let translations: Record<string, any>;
  if (locale.startsWith('zh')) {
    translations = (await import('./zh.json')).default;
  } else {
    translations = (await import('./en.json')).default;
  }

  function getNested(key: string): string {
    const value = key.split('.').reduce((obj, k) => (obj && obj[k] !== undefined ? obj[k] : key), translations);
    return typeof value === 'string' ? value : key;
  }

  return (key: string) => getNested(key);

}
