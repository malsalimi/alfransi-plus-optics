"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Locale, getDictionary } from "@/i18n";

type DictionaryType = ReturnType<typeof getDictionary>;

interface LocaleContextType {
  locale: Locale;
  dict: DictionaryType;
  setLocale: (locale: Locale) => void;
  dir: "rtl" | "ltr";
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ar");

  useEffect(() => {
    // Read saved locale preference from localStorage or cookie
    const savedLocale = localStorage.getItem("alfransi_locale") as Locale;
    if (savedLocale && (savedLocale === "ar" || savedLocale === "en")) {
      setLocaleState(savedLocale);
    }
  }, []);

  useEffect(() => {
    const dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.documentElement.lang = locale;
    localStorage.setItem("alfransi_locale", locale);
    document.cookie = `alfransi_locale=${locale}; path=/; max-age=31536000; SameSite=Lax`;
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
  };

  const dict = getDictionary(locale);
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <LocaleContext.Provider value={{ locale, dict, setLocale, dir }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
