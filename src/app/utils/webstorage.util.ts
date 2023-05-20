const LANG = "language";

export function getLanguage(): string | null {
  return localStorage.getItem(LANG);
}

export function setLanguage(lang: string): void {
  localStorage.setItem(LANG, lang);
}
