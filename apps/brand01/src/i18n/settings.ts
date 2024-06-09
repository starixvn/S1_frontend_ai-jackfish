export const fallbackLng = "en";
export const languages = [
  fallbackLng,
  "th",
  "bd",
  "ch",
  "cs",
  "gb",
  "id",
  "in",
  "kh",
  "vn",
];
export const defaultNS = "common";
export const cookieName = "i18next";

export function getOptions(
  lng = fallbackLng,
  ns: string | string[] = defaultNS,
) {
  return {
    // debug: true,
    supportedLngs: languages,
    // preload: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
