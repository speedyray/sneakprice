import Link from "next/link";
import { Globe } from "lucide-react";
import fr from "@/messages/fr.json";
import de from "@/messages/de.json";
import es from "@/messages/es.json";
import ja from "@/messages/ja.json";
import ar from "@/messages/ar.json";
import zh from "@/messages/zh.json";

type Messages = typeof fr;

const LANGUAGE_DATA: Record<string, { native: string; label: string; dir?: string; messages: Messages }> = {
  fr:    { native: "Français",   label: "French",              messages: fr },
  de:    { native: "Deutsch",    label: "German",              messages: de },
  es:    { native: "Español",    label: "Spanish",             messages: es },
  ja:    { native: "日本語",      label: "Japanese",            messages: ja },
  ar:    { native: "العربية",    label: "Arabic",   dir: "rtl", messages: ar },
  zh:    { native: "中文简体",    label: "Chinese Simplified",  messages: zh },
};

const COMING_SOON: Record<string, { native: string; label: string; greeting: string; tagline: string; dir?: string }> = {
  // European
  "it":    { native: "Italiano",        label: "Italian",              greeting: "Benvenuto su SneakPrice",                  tagline: "La tua piattaforma di intelligence del mercato sneaker" },
  "pt":    { native: "Português",       label: "Portuguese",           greeting: "Bem-vindo ao SneakPrice",                  tagline: "Sua plataforma de inteligência do mercado de sneakers" },
  "nl":    { native: "Nederlands",      label: "Dutch",                greeting: "Welkom bij SneakPrice",                    tagline: "Uw sneaker marktintelligentie platform" },
  "sv":    { native: "Svenska",         label: "Swedish",              greeting: "Välkommen till SneakPrice",                tagline: "Din plattform för sneaker-marknadsunderrättelser" },
  "no":    { native: "Norsk",           label: "Norwegian",            greeting: "Velkommen til SneakPrice",                 tagline: "Din plattform for sneakermarkedsintelligens" },
  "da":    { native: "Dansk",           label: "Danish",               greeting: "Velkommen til SneakPrice",                 tagline: "Din platform for sneaker-markedsintelligens" },
  "fi":    { native: "Suomi",           label: "Finnish",              greeting: "Tervetuloa SneakPriceen",                  tagline: "Lenkkarimarkkina-älyalustasi" },
  "pl":    { native: "Polski",          label: "Polish",               greeting: "Witamy w SneakPrice",                      tagline: "Twoja platforma analizy rynku sneakerów" },
  "cs":    { native: "Čeština",         label: "Czech",                greeting: "Vítejte na SneakPrice",                    tagline: "Vaše platforma pro analýzu trhu se sneakery" },
  "sk":    { native: "Slovenčina",      label: "Slovak",               greeting: "Vitajte na SneakPrice",                    tagline: "Vaša platforma pre analýzu trhu so sneakermi" },
  "hu":    { native: "Magyar",          label: "Hungarian",            greeting: "Üdvözöljük a SneakPrice-ban",              tagline: "A sneaker piaci intelligencia platformja" },
  "ro":    { native: "Română",          label: "Romanian",             greeting: "Bun venit la SneakPrice",                  tagline: "Platforma ta de inteligență pe piața sneakerilor" },
  "bg":    { native: "Български",       label: "Bulgarian",            greeting: "Добре дошли в SneakPrice",                 tagline: "Вашата платформа за разузнаване на пазара на маратонки" },
  "el":    { native: "Ελληνικά",        label: "Greek",                greeting: "Καλώς ήρθατε στο SneakPrice",             tagline: "Η πλατφόρμα σας για αγορά αθλητικών παπουτσιών" },
  "uk":    { native: "Українська",      label: "Ukrainian",            greeting: "Ласкаво просимо до SneakPrice",            tagline: "Ваша платформа аналітики ринку кросівок" },
  "ru":    { native: "Русский",         label: "Russian",              greeting: "Добро пожаловать в SneakPrice",            tagline: "Ваша платформа аналитики рынка кроссовок" },
  "tr":    { native: "Türkçe",          label: "Turkish",              greeting: "SneakPrice'a Hoş Geldiniz",               tagline: "Sneaker piyasa zekası platformunuz" },
  "sr":    { native: "Српски",          label: "Serbian",              greeting: "Добродошли у SneakPrice",                  tagline: "Ваша платформа за тржишну аналитику патика" },
  "hr":    { native: "Hrvatski",        label: "Croatian",             greeting: "Dobrodošli u SneakPrice",                  tagline: "Vaša platforma za tržišnu inteligenciju tenisica" },
  "sl":    { native: "Slovenščina",     label: "Slovenian",            greeting: "Dobrodošli v SneakPrice",                  tagline: "Vaša platforma za tržiščno inteligenco superge" },
  "et":    { native: "Eesti",           label: "Estonian",             greeting: "Tere tulemast SneakPrice'i",               tagline: "Teie sneaker-turu luurevahend" },
  "lv":    { native: "Latviešu",        label: "Latvian",              greeting: "Laipni lūdzam SneakPrice",                 tagline: "Jūsu sporta apavu tirgus izlūkošanas platforma" },
  "lt":    { native: "Lietuvių",        label: "Lithuanian",           greeting: "Sveiki atvykę į SneakPrice",              tagline: "Jūsų sportinių batų rinkos žvalgybos platforma" },
  "ca":    { native: "Català",          label: "Catalan",              greeting: "Benvingut a SneakPrice",                   tagline: "La teva plataforma d'intel·ligència del mercat de sneakers" },
  "eu":    { native: "Euskara",         label: "Basque",               greeting: "Ongi etorri SneakPrice-ra",                tagline: "Zure zapatila merkatuaren adimen plataforma" },
  "gl":    { native: "Galego",          label: "Galician",             greeting: "Benvido a SneakPrice",                     tagline: "A túa plataforma de intelixencia do mercado de zapatillas" },
  "sq":    { native: "Shqip",           label: "Albanian",             greeting: "Mirë se vini në SneakPrice",               tagline: "Platforma juaj e inteligjencës së tregut të sneakers" },
  "bs":    { native: "Bosanski",        label: "Bosnian",              greeting: "Dobrodošli u SneakPrice",                  tagline: "Vaša platforma za tržišnu inteligenciju patika" },
  "mk":    { native: "Македонски",      label: "Macedonian",           greeting: "Добредојдовте во SneakPrice",              tagline: "Вашата платформа за пазарна интелигенција на патики" },
  // Middle East / RTL
  "he":    { native: "עברית",           label: "Hebrew",               greeting: "ברוכים הבאים ל-SneakPrice",                tagline: "הפלטפורמה שלכם לאינטליגנציה בשוק הסניקרס",    dir: "rtl" },
  "fa":    { native: "فارسی",           label: "Persian",              greeting: "به SneakPrice خوش آمدید",                  tagline: "پلتفرم هوش بازار کتانی شما",                   dir: "rtl" },
  "ur":    { native: "اردو",            label: "Urdu",                 greeting: "SneakPrice میں خوش آمدید",                 tagline: "آپ کا اسنیکر مارکیٹ انٹیلیجنس پلیٹ فارم",     dir: "rtl" },
  // South Asia
  "hi":    { native: "हिन्दी",          label: "Hindi",                greeting: "SneakPrice में आपका स्वागत है",            tagline: "आपका स्नीकर मार्केट इंटेलिजेंस प्लेटफॉर्म" },
  "bn":    { native: "বাংলা",           label: "Bengali",              greeting: "SneakPrice-এ আপনাকে স্বাগতম",             tagline: "আপনার স্নিকার মার্কেট ইন্টেলিজেন্স প্ল্যাটফর্ম" },
  "pa":    { native: "ਪੰਜਾਬੀ",          label: "Punjabi",              greeting: "SneakPrice ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ",          tagline: "ਤੁਹਾਡਾ ਸਨੀਕਰ ਮਾਰਕੀਟ ਇੰਟੈਲੀਜੈਂਸ ਪਲੇਟਫਾਰਮ" },
  "gu":    { native: "ગુજરાતી",         label: "Gujarati",             greeting: "SneakPrice-માં આપનું સ્વાગત છે",           tagline: "તમારું સ્નિકર માર્કેટ ઇન્ટેલિજન્સ પ્લેટફોર્મ" },
  "mr":    { native: "मराठी",           label: "Marathi",              greeting: "SneakPrice मध्ये आपले स्वागत आहे",         tagline: "तुमचे स्नीकर मार्केट इंटेलिजन्स प्लॅटफॉर्म" },
  "ta":    { native: "தமிழ்",           label: "Tamil",                greeting: "SneakPrice-ல் உங்களை வரவேற்கிறோம்",       tagline: "உங்கள் ஸ்னீக்கர் சந்தை நுண்ணறிவு தளம்" },
  "te":    { native: "తెలుగు",          label: "Telugu",               greeting: "SneakPrice లో మీకు స్వాగతం",              tagline: "మీ స్నీకర్ మార్కెట్ ఇంటెలిజెన్స్ ప్లాట్‌ఫారం" },
  "kn":    { native: "ಕನ್ನಡ",           label: "Kannada",              greeting: "SneakPrice ಗೆ ಸ್ವಾಗತ",                    tagline: "ನಿಮ್ಮ ಸ್ನೀಕರ್ ಮಾರ್ಕೆಟ್ ಇಂಟೆಲಿಜೆನ್ಸ್ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್" },
  "ml":    { native: "മലയാളം",          label: "Malayalam",            greeting: "SneakPrice-ലേക്ക് സ്വാഗതം",               tagline: "നിങ്ങളുടെ സ്നീക്കർ മാർക്കറ്റ് ഇൻ്റലിജൻസ് പ്ലാറ്റ്‌ഫോം" },
  // East / Southeast Asia
  "zh-hk": { native: "中文・香港",        label: "Chinese Hong Kong",    greeting: "歡迎來到 SneakPrice",                      tagline: "您的波鞋市場情報平台" },
  "zh-tw": { native: "中文繁體",         label: "Chinese Traditional",  greeting: "歡迎來到 SneakPrice",                      tagline: "您的球鞋市場情報平台" },
  "ko":    { native: "한국어",           label: "Korean",               greeting: "SneakPrice에 오신 것을 환영합니다",           tagline: "스니커 시장 인텔리전스 플랫폼" },
  "th":    { native: "ไทย",             label: "Thai",                 greeting: "ยินดีต้อนรับสู่ SneakPrice",               tagline: "แพลตฟอร์มข้อมูลตลาดรองเท้าผ้าใบของคุณ" },
  "vi":    { native: "Tiếng Việt",      label: "Vietnamese",           greeting: "Chào mừng đến với SneakPrice",             tagline: "Nền tảng thông minh thị trường giày thể thao của bạn" },
  "id":    { native: "Bahasa Indonesia", label: "Indonesian",          greeting: "Selamat datang di SneakPrice",              tagline: "Platform intelijen pasar sneaker Anda" },
  "ms":    { native: "Bahasa Melayu",   label: "Malay",                greeting: "Selamat datang ke SneakPrice",              tagline: "Platform risikan pasaran sneaker anda" },
  "tl":    { native: "Filipino",        label: "Filipino",             greeting: "Maligayang pagdating sa SneakPrice",        tagline: "Ang iyong platform ng market intelligence para sa sneakers" },
  // Africa
  "sw":    { native: "Kiswahili",       label: "Swahili",              greeting: "Karibu SneakPrice",                        tagline: "Jukwaa lako la akili ya soko la viatu vya michezo" },
};

export function generateStaticParams() {
  return [
    ...Object.keys(LANGUAGE_DATA),
    ...Object.keys(COMING_SOON),
  ].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = LANGUAGE_DATA[locale] ?? COMING_SOON[locale];
  return { title: lang ? `SneakPrice — ${lang.label}` : "SneakPrice" };
}

export default async function LangPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  /* ── Fully translated pages (fr, de, es) ─────────────── */
  if (LANGUAGE_DATA[locale]) {
    const { native, label, dir, messages: t } = LANGUAGE_DATA[locale];

    return (
      <div className="min-h-screen bg-white" dir={dir}>
        {/* Hero */}
        <section className="bg-[#f5f0e8] px-6 py-20 text-center">
          <div className="mx-auto max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
              <Globe className="h-4 w-4" />
              {native}
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-green-600">
              {t.home.hero_badge}
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight text-black sm:text-5xl">
              {t.home.hero_title}
            </h1>
            <p className="text-lg text-neutral-600">{t.home.hero_subtitle}</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              {t.lang_page.browse_english}
            </Link>
          </div>
        </section>

        {/* Steps */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { num: "1", title: t.home.step1_title, desc: t.home.step1_desc },
              { num: "2", title: t.home.step2_title, desc: t.home.step2_desc },
              { num: "3", title: t.home.step3_title, desc: t.home.step3_desc },
            ].map((step) => (
              <div key={step.num} className="rounded-2xl border border-black/10 p-6">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
                  {step.num}
                </span>
                <h3 className="mt-3 font-semibold text-black">{step.title}</h3>
                <p className="mt-1 text-sm text-neutral-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Nav links translated */}
        <section className="border-t border-black/10 bg-neutral-50 px-6 py-10">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-lg font-bold text-black">{t.secondaryNav.encyclopedia}</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { label: t.secondaryNav.home, href: "/" },
                { label: t.secondaryNav.encyclopedia, href: "/encyclopedia/a-z" },
                { label: t.secondaryNav.care, href: "/care/cleaning" },
                { label: t.secondaryNav.exchange, href: "/exchange" },
                { label: t.secondaryNav.blog, href: "/blog" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl border border-black/10 px-4 py-2 text-sm font-medium text-black transition hover:border-green-500 hover:text-green-700"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-4xl px-6 py-10">
          <div className="rounded-2xl border-2 border-green-500 bg-gradient-to-br from-green-50 to-emerald-100 p-8 shadow-lg text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-green-600">
              {t.encyclopedia.check_resale_badge}
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-green-800 sm:text-4xl">
              {t.encyclopedia.check_resale_title}
            </h2>
            <p className="mt-3 text-lg text-neutral-700">{t.encyclopedia.check_resale_desc}</p>
            <Link
              href="https://sneakpriceapp.com/"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-base font-bold text-white shadow-md transition hover:bg-green-700"
            >
              {t.encyclopedia.check_resale_cta}
            </Link>
          </div>
        </section>

        <div className="border-t border-black/10 px-6 py-6 text-center">
          <Link href="/" className="text-sm text-neutral-500 hover:text-black">
            {t.lang_page.back_english}
          </Link>
        </div>
      </div>
    );
  }

  /* ── Coming soon pages (all other languages) ─────────── */
  const lang = COMING_SOON[locale];
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
          <Link href="/" className="rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800">
            ← Back to English
          </Link>
          <Link href="/discover" className="rounded-xl border border-black/10 px-6 py-3 text-sm font-semibold text-black transition hover:border-black/30">
            Browse in English
          </Link>
        </div>
      </div>
    </div>
  );
}
