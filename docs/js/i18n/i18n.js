import { translations } from "./translations.js";

const DEFAULT_LANGUAGE = "en";

export function getCurrentLanguage() {
  return localStorage.getItem("language") || DEFAULT_LANGUAGE;
}

export function setLanguage(language) {
  localStorage.setItem("language", language);
}

// t("nav.search") -> translations[lang].nav.search. Олдохгүй бол path-ыг буцаана.
export function t(path) {
  const language = getCurrentLanguage();
  let value = translations[language];
  for (const key of path.split(".")) {
    value = value?.[key];
  }
  return value ?? path;
}

export function toggleLanguage() {
  const next = getCurrentLanguage() === "mn" ? "en" : "mn";
  setLanguage(next);
  return next;
}
