import { ar } from "./ar";
import { en } from "./en";

export type Locale = "ar" | "en";

export const dictionaries = {
  ar,
  en,
};

export function getDictionary(locale: Locale = "ar") {
  return dictionaries[locale] || dictionaries.ar;
}
