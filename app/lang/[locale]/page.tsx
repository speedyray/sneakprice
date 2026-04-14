import Link from "next/link";
import { Globe } from "lucide-react";

const LANGUAGE_META: Record<string, { native: string; label: string; greeting: string; tagline: string; dir?: string }> = {
  "zh-TW": { native: "繁體中文", label: "Traditional Chinese", greeting: "歡迎來到 SneakPrice",   tagline: "您的球鞋市場情報平台" },
  "ja":    { native: "日本語",   label: "Japanese",            greeting: "SneakPrice へようこそ", tagline: "スニーカー市場インテリジェンスプラットフォーム" },
  "es":    { native: "Español",  label: "Spanish",             greeting: "Bienvenido a SneakPrice", tagline: "Tu plataforma de inteligencia del mercado de sneakers" },
  "fr":    { native: "Français", label: "French",              greeting: "Bienvenue sur SneakPrice", tagline: "Votre plateforme d'intelligence du marché des sneakers" },
  "de":    { native: "Deutsch",  label: "German",              greeting: "Willkommen bei SneakPrice", tagline: "Ihre Sneaker-Marktintelligenz-Plattform" },
  "ru":    { native: "Русский",  label: "Russian",             greeting: "Добро пожаловать в SneakPrice", tagline: "Ваша платформа аналитики рынка кроссовок" },
  "pt":    { native: "Português",label: "Portuguese",          greeting: "Bem-vindo ao SneakPrice", tagline: "Sua plataforma de inteligência do mercado de sneakers" },
  "it":    { native: "Italiano", label: "Italian",             greeting: "Benvenuto su SneakPrice", tagline: "La tua piattaforma di intelligence del mercato sneaker" },
  "ko":    { native: "한국어",   label: "Korean",              greeting: "SneakPrice에 오신 것을 환영합니다", tagline: "스니커 시장 인텔리전스 플랫폼" },
  "nl":    { native: "Nederlands",label: "Dutch",              greeting: "Welkom bij SneakPrice",  tagline: "Uw sneaker marktintelligentie platform" },
  "ar":    { native: "العربية", label: "Arabic",               greeting: "مرحباً بك في SneakPrice", tagline: "منصة ذكاء سوق الأحذية الرياضية", dir: "rtl" },
};

export function generateStaticParams() {
  return Object.keys(LANGUAGE_META).map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }) {
  const lang = LANGUAGE_META[params.locale];
  return {
    title: lang ? `SneakPrice — ${lang.label}` : "SneakPrice",
  };
}

export default function LangPage({ params }: { params: { locale: string } }) {
  const lang = LANGUAGE_META[params.locale];

  if (!lang) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-neutral-500">Language not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white" dir={lang.dir}>
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
          <Globe className="h-4 w-4" />
          {lang.native}
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-black sm:text-5xl">
          {lang.greeting}
        </h1>
        <p className="mt-4 text-lg text-neutral-500">{lang.tagline}</p>

        <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 px-8 py-8">
          <p className="text-2xl font-bold text-amber-700">🚧 Coming Soon</p>
          <p className="mt-2 text-neutral-600">
            The full SneakPrice experience in <strong>{lang.label}</strong> is on its way.
            We&apos;re working hard to bring you live sneaker market data, arbitrage tools,
            and the encyclopedia in your language.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            ← Back to English
          </Link>
          <Link
            href="/discover"
            className="rounded-xl border border-black/10 px-6 py-3 text-sm font-semibold text-black transition hover:border-black/30"
          >
            Browse in English
          </Link>
        </div>
      </div>
    </div>
  );
}
