"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

import en from "@/messages/en.json";
import fr from "@/messages/fr.json";
import de from "@/messages/de.json";
import es from "@/messages/es.json";
import ja from "@/messages/ja.json";
import ar from "@/messages/ar.json";
import zh from "@/messages/zh.json";
import zhtw from "@/messages/zh-tw.json";

export type Messages = typeof en;

const MESSAGES: Record<string, Messages> = { en, fr, de, es, ja, ar, zh, "zh-tw": zhtw };

const RTL_LOCALES = new Set(["ar", "he", "fa", "ur"]);

interface LanguageContextValue {
  locale: string;
  t: Messages;
  dir: "ltr" | "rtl";
  setLocale: (code: string) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: "en",
  t: en,
  dir: "ltr",
  setLocale: () => {},
});

const STORAGE_KEY = "sneakprice-locale";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState("en");

  // Hydrate from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && MESSAGES[saved]) {
      setLocaleState(saved);
    }
  }, []);

  function setLocale(code: string) {
    setLocaleState(code);
    localStorage.setItem(STORAGE_KEY, code);
  }

  const t = MESSAGES[locale] ?? en;
  const dir: "ltr" | "rtl" = RTL_LOCALES.has(locale) ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ locale, t, dir, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
