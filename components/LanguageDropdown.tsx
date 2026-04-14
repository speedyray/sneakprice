"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

const LANGUAGES = [
  { code: "en",    label: "English",    native: "English"    },
  { code: "zh-TW", label: "Traditional Chinese", native: "繁體中文"  },
  { code: "ja",    label: "Japanese",   native: "日本語"      },
  { code: "es",    label: "Spanish",    native: "Español"    },
  { code: "fr",    label: "French",     native: "Français"   },
  { code: "de",    label: "German",     native: "Deutsch"    },
  { code: "ru",    label: "Russian",    native: "Русский"    },
  { code: "pt",    label: "Portuguese", native: "Português"  },
  { code: "it",    label: "Italian",    native: "Italiano"   },
  { code: "ko",    label: "Korean",     native: "한국어"      },
  { code: "nl",    label: "Dutch",      native: "Nederlands" },
  { code: "ar",    label: "Arabic",     native: "العربية"    },
];

export default function LanguageDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(LANGUAGES[0]);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function select(lang: (typeof LANGUAGES)[number]) {
    setSelected(lang);
    setOpen(false);
    if (lang.code === "en") {
      router.push("/");
    } else {
      router.push(`/lang/${lang.code}`);
    }
  }

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
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-1.5 w-44 overflow-hidden rounded-xl border border-black/10 bg-white py-1 shadow-xl"
        >
          {LANGUAGES.map((lang) => (
            <li key={lang.code}>
              <button
                role="option"
                aria-selected={selected.code === lang.code}
                onClick={() => select(lang)}
                className={`w-full px-4 py-2 text-left text-sm transition hover:bg-green-50 hover:text-green-700 ${
                  selected.code === lang.code
                    ? "bg-green-50 font-semibold text-green-700"
                    : "text-neutral-700"
                }`}
              >
                {lang.native}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
