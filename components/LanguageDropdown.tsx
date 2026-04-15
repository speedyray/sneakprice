"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Only languages with a full messages JSON file
const LANGUAGES = [
  { code: "en",    label: "English",             native: "English",          dir: "ltr" },
  { code: "zh",    label: "Chinese Simplified",  native: "中文简体",          dir: "ltr" },
  { code: "zh-tw", label: "Chinese Traditional", native: "中文繁體",          dir: "ltr" },
  { code: "ja",    label: "Japanese",            native: "日本語",            dir: "ltr" },
  { code: "ko",    label: "Korean",              native: "한국어",            dir: "ltr" },
  { code: "es",    label: "Spanish",             native: "Español",          dir: "ltr" },
  { code: "pt",    label: "Portuguese",          native: "Português",        dir: "ltr" },
  { code: "fr",    label: "French",              native: "Français",         dir: "ltr" },
  { code: "de",    label: "German",              native: "Deutsch",          dir: "ltr" },
  { code: "ar",    label: "Arabic",              native: "العربية",          dir: "rtl" },
  { code: "bn",    label: "Bengali",             native: "বাংলা",            dir: "ltr" },
  { code: "th",    label: "Thai",                native: "ไทย",              dir: "ltr" },
  { code: "vi",    label: "Vietnamese",          native: "Tiếng Việt",       dir: "ltr" },
  { code: "id",    label: "Indonesian",          native: "Bahasa Indonesia",  dir: "ltr" },
  { code: "ms",    label: "Malay",               native: "Bahasa Melayu",    dir: "ltr" },
  { code: "tl",    label: "Filipino",            native: "Filipino",         dir: "ltr" },
  { code: "it",    label: "Italian",             native: "Italiano",         dir: "ltr" },
  { code: "nl",    label: "Dutch",               native: "Nederlands",       dir: "ltr" },
  { code: "tr",    label: "Turkish",             native: "Türkçe",           dir: "ltr" },
  { code: "hi",    label: "Hindi",               native: "हिन्दी",           dir: "ltr" },
  { code: "zh-hk", label: "Chinese Hong Kong",   native: "中文・香港",        dir: "ltr" },
] as const;

type Language = (typeof LANGUAGES)[number];

export default function LanguageDropdown() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const { locale, setLocale } = useLanguage();

  const selected = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => searchRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [open]);

  function select(lang: Language) {
    setLocale(lang.code);
    setOpen(false);
    setQuery("");
  }

  const filtered = query.trim()
    ? LANGUAGES.filter(
        (l) =>
          l.label.toLowerCase().includes(query.toLowerCase()) ||
          l.native.toLowerCase().includes(query.toLowerCase())
      )
    : LANGUAGES;

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm font-medium text-black/80 transition hover:border-black/20 hover:text-black"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Globe className="h-4 w-4 text-green-600" />
        <span>{selected.native}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-black/50 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full z-50 mt-1.5 w-56 overflow-hidden rounded-xl border border-black/10 bg-white shadow-xl"
        >
          {/* Search */}
          <div className="border-b border-black/10 px-3 py-2">
            <div className="flex items-center gap-2 rounded-lg border border-black/10 bg-neutral-50 px-2.5 py-1.5">
              <Search className="h-3.5 w-3.5 shrink-0 text-neutral-400" />
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search language..."
                className="w-full bg-transparent text-xs text-neutral-700 outline-none placeholder:text-neutral-400"
              />
            </div>
          </div>

          {/* List */}
          <ul className="max-h-80 overflow-y-auto py-1">
            {filtered.length === 0 && (
              <li className="px-4 py-3 text-xs text-neutral-400">No languages found</li>
            )}
            {filtered.map((lang) => (
              <li key={lang.code}>
                <button
                  role="option"
                  aria-selected={selected.code === lang.code}
                  onClick={() => select(lang)}
                  dir={lang.dir}
                  className={`w-full px-4 py-2 text-left text-sm transition hover:bg-green-50 hover:text-green-700 ${
                    selected.code === lang.code
                      ? "bg-green-50 font-semibold text-green-700"
                      : "text-neutral-700"
                  }`}
                >
                  <span className="block text-base font-medium">{lang.native}</span>
                  <span className="block text-sm text-neutral-400">{lang.label}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="border-t border-black/5 px-4 py-1.5 text-[10px] text-neutral-400">
            {LANGUAGES.length} languages
          </div>
        </div>
      )}
    </div>
  );
}
