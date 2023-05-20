const LANG = 'language';

/**
 * Get language from storage.
 */
export function getLanguage(): string | null {
    return localStorage.getItem(LANG);
}

/**
 * Set language from storage.
 * @param {string} lang language for set.
 */
export function setLanguage(lang: string): void {
    localStorage.setItem(LANG, lang);
}