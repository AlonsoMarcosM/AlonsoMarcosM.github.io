import { ui, defaultLang, locales, type Lang, type UIKey } from './ui';

/** Campo de texto bilingüe usado en los datos de contenido. */
export interface I18nText {
  es: string;
  en: string;
}

/** Lista bilingüe (p.ej. bullets). */
export interface I18nList {
  es: string[];
  en: string[];
}

/** Devuelve el valor en el idioma dado, con fallback al idioma por defecto. */
export function pick<T>(field: { es: T; en: T }, lang: Lang): T {
  return field[lang] ?? field[defaultLang];
}

/** Comprueba y normaliza un parámetro de idioma de la URL. */
export function isLang(value: string | undefined): value is Lang {
  return value === 'es' || value === 'en';
}

/** Genera una función de traducción de UI para el idioma dado. */
export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/** Construye una ruta absoluta con prefijo de idioma. P.ej. ('en', '/projects') -> '/en/projects'. */
export function localePath(lang: Lang, path = ''): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const full = `/${lang}${clean === '/' ? '' : clean}`;
  return full.endsWith('/') ? full : `${full}/`;
}

/** Devuelve el idioma "opuesto" (para el selector ES <-> EN). */
export function otherLang(lang: Lang): Lang {
  return lang === 'es' ? 'en' : 'es';
}

export { locales, defaultLang };
export type { Lang };
