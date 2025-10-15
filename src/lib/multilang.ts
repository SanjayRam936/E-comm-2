// Multi-Language Support Library
import type { SupportedLanguage, ContextualHelp } from "@/types/chat";

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  { code: "en", name: "English", native_name: "English", is_rtl: false },
  { code: "hi", name: "Hindi", native_name: "हिन्दी", is_rtl: false },
  { code: "bn", name: "Bengali", native_name: "বাংলা", is_rtl: false },
  { code: "te", name: "Telugu", native_name: "తెలుగు", is_rtl: false },
  { code: "ta", name: "Tamil", native_name: "தமிழ்", is_rtl: false },
  { code: "gu", name: "Gujarati", native_name: "ગુજરાતી", is_rtl: false },
  { code: "mr", name: "Marathi", native_name: "मराठी", is_rtl: false },
  { code: "kn", name: "Kannada", native_name: "ಕನ್ನಡ", is_rtl: false },
  { code: "ml", name: "Malayalam", native_name: "മലയാളം", is_rtl: false },
  { code: "pa", name: "Punjabi", native_name: "ਪੰਜਾਬੀ", is_rtl: false },
  { code: "or", name: "Odia", native_name: "ଓଡ଼ିଆ", is_rtl: false },
  { code: "as", name: "Assamese", native_name: "অসমীয়া", is_rtl: false },
];

// Translation mappings for common UI elements
const translations = {
  en: {
    welcome: "Welcome to ComplianceCheck",
    scan_product: "Scan Product",
    file_complaint: "File Complaint",
    check_compliance: "Check Compliance", 
    price_analysis: "Price Analysis",
    help: "Help",
    settings: "Settings",
    language: "Language",
    loading: "Loading...",
    error: "An error occurred",
    success: "Operation successful",
    cancel: "Cancel",
    confirm: "Confirm",
    save: "Save",
    upload: "Upload",
    download: "Download",
    search: "Search",
    filter: "Filter",
    sort: "Sort",
    view_details: "View Details",
    edit: "Edit",
    delete: "Delete",
    back: "Back",
    next: "Next",
    previous: "Previous",
    submit: "Submit",
    reset: "Reset"
  },
  hi: {
    welcome: "ComplianceCheck में आपका स्वागत है",
    scan_product: "उत्पाद स्कैन करें",
    file_complaint: "शिकायत दर्ज करें",
    check_compliance: "अनुपालन जांचें",
    price_analysis: "मूल्य विश्लेषण",
    help: "सहायता",
    settings: "सेटिंग्स",
    language: "भाषा",
    loading: "लोड हो रहा है...",
    error: "एक त्रुटि हुई",
    success: "कार्य सफल",
    cancel: "रद्द करें",
    confirm: "पुष्टि करें",
    save: "सेव करें",
    upload: "अपलोड करें",
    download: "डाउनलोड करें", 
    search: "खोजें",
    filter: "फ़िल्टर",
    sort: "क्रमबद्ध करें",
    view_details: "विवरण देखें",
    edit: "संपादित करें",
    delete: "हटाएं",
    back: "वापस",
    next: "अगला",
    previous: "पिछला",
    submit: "जमा करें",
    reset: "रीसेट करें"
  },
  bn: {
    welcome: "ComplianceCheck-এ আপনাকে স্বাগতম",
    scan_product: "প্রোডাক্ট স্ক্যান করুন",
    file_complaint: "অভিযোগ দাখিল করুন",
    check_compliance: "সম্মতি যাচাই করুন",
    price_analysis: "মূল্য বিশ্লেষণ",
    help: "সাহায্য",
    settings: "সেটিংস",
    language: "ভাষা",
    loading: "লোড হচ্ছে...",
    error: "একটি ত্রুটি ঘটেছে",
    success: "কাজ সফল",
    cancel: "বাতিল",
    confirm: "নিশ্চিত করুন",
    save: "সেভ করুন",
    upload: "আপলোড করুন",
    download: "ডাউনলোড করুন",
    search: "খুঁজুন",
    filter: "ফিল্টার",
    sort: "সাজান",
    view_details: "বিস্তারিত দেখুন",
    edit: "সম্পাদনা",
    delete: "মুছুন",
    back: "পিছনে",
    next: "পরবর্তী",
    previous: "পূর্ববর্তী",
    submit: "জমা দিন",
    reset: "রিসেট করুন"
  },
  ta: {
    welcome: "ComplianceCheck-க்கு வரவேற்கிறோம்",
    scan_product: "தயாரிப்பை ஸ்கேன் செய்யுங்கள்",
    file_complaint: "புகார் தாக்கல் செய்யுங்கள்",
    check_compliance: "இணக்கத்தை சரிபார்க்கவும்",
    price_analysis: "விலை பகுப்பாய்வு",
    help: "உதவி",
    settings: "அமைப்புகள்",
    language: "மொழி",
    loading: "ஏற்றுகிறது...",
    error: "ஒரு பிழை ஏற்பட்டது",
    success: "வேலை வெற்றிகரமாக",
    cancel: "ரத்து செய்",
    confirm: "உறுதிப்படுத்தவும்",
    save: "சேமிக்கவும்",
    upload: "பதிவேற்றவும்",
    download: "பதிவிறக்கவும்",
    search: "தேடுங்கள்",
    filter: "வடிகட்டி",
    sort: "வரிசைப்படுத்து",
    view_details: "விவரங்களைப் பார்க்கவум்",
    edit: "திருத்தவும்",
    delete: "நீக்கவும்",
    back: "மீண்டும்",
    next: "அடுத்தது",
    previous: "முந்தைய",
    submit: "சமர்ப்பிக்கவும்",
    reset: "மீட்டமைக்கவும்"
  }
};

export function getTranslation(key: string, language: string = "en"): string {
  const langTranslations = translations[language as keyof typeof translations] || translations.en;
  return langTranslations[key as keyof typeof langTranslations] || key;
}

export function detectLanguage(text: string): string {
  // Simple language detection based on character ranges
  // Hindi (Devanagari)
  if (/[\u0900-\u097F]/.test(text)) return "hi";
  // Bengali
  if (/[\u0980-\u09FF]/.test(text)) return "bn";
  // Tamil
  if (/[\u0B80-\u0BFF]/.test(text)) return "ta";
  // Telugu
  if (/[\u0C00-\u0C7F]/.test(text)) return "te";
  // Gujarati
  if (/[\u0A80-\u0AFF]/.test(text)) return "gu";
  // Kannada
  if (/[\u0C80-\u0CFF]/.test(text)) return "kn";
  // Malayalam
  if (/[\u0D00-\u0D7F]/.test(text)) return "ml";
  // Punjabi
  if (/[\u0A00-\u0A7F]/.test(text)) return "pa";
  
  return "en"; // Default to English
}

export function formatCurrency(amount: number, language: string = "en"): string {
  const formatter = new Intl.NumberFormat(getLocale(language), {
    style: "currency",
    currency: "INR"
  });
  return formatter.format(amount);
}

export function formatDate(date: Date, language: string = "en"): string {
  const formatter = new Intl.DateTimeFormat(getLocale(language), {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  return formatter.format(date);
}

function getLocale(language: string): string {
  const localeMap: Record<string, string> = {
    en: "en-IN",
    hi: "hi-IN",
    bn: "bn-IN",
    ta: "ta-IN",
    te: "te-IN",
    gu: "gu-IN",
    mr: "mr-IN",
    kn: "kn-IN",
    ml: "ml-IN",
    pa: "pa-IN"
  };
  return localeMap[language] || "en-IN";
}

// Contextual help for different features
export const CONTEXTUAL_HELP: Record<string, ContextualHelp> = {
  scanner: {
    feature: "scanner",
    language: "en",
    quick_actions: [
      { label: "Take Photo", action: "camera", description: "Capture product image" },
      { label: "Upload Image", action: "upload", description: "Select image from device" },
      { label: "Scan Barcode", action: "barcode", description: "Scan product barcode" }
    ],
    common_questions: [
      {
        question: "How do I scan a product?",
        answer: "You can either take a photo of the product, upload an existing image, or scan the barcode for quick identification."
      },
      {
        question: "What information is extracted?",
        answer: "We extract MRP, net quantity, manufacturing date, expiry date, and other compliance-related information."
      }
    ],
    guided_steps: [
      {
        step_number: 1,
        title: "Position the Product",
        description: "Ensure the product label is clearly visible and well-lit",
        action_required: "Adjust camera angle"
      },
      {
        step_number: 2,
        title: "Capture or Upload",
        description: "Take a clear photo or upload an existing image",
        action_required: "Press capture button"
      },
      {
        step_number: 3,
        title: "Review Results",
        description: "Check the extracted information for accuracy",
        action_required: "Verify details"
      }
    ]
  },
  
  price_manipulation: {
    feature: "price_manipulation",
    language: "en",
    quick_actions: [
      { label: "Analyze Product", action: "analyze", description: "Check price manipulation risk" },
      { label: "View Alerts", action: "alerts", description: "See active price alerts" },
      { label: "Historical Data", action: "history", description: "View price history" }
    ],
    common_questions: [
      {
        question: "How is price manipulation detected?",
        answer: "We analyze historical price data, festive period patterns, and sudden price spikes to identify artificial inflation."
      },
      {
        question: "What are the risk scores?",
        answer: "Scores range from 0-100: Low (0-39), Medium (40-69), High (70-100) indicating manipulation likelihood."
      }
    ]
  },

  verification: {
    feature: "verification",
    language: "en",
    quick_actions: [
      { label: "Start Verification", action: "start", description: "Begin product verification process" },
      { label: "Upload Documents", action: "upload_docs", description: "Submit certificates or evidence" },
      { label: "Check Status", action: "status", description: "View verification progress" }
    ],
    common_questions: [
      {
        question: "What is dual-side verification?",
        answer: "Both consumers and sellers can verify products - consumers for authenticity, sellers for compliance certification."
      },
      {
        question: "How long does verification take?",
        answer: "Verification typically takes 2-5 business days depending on the complexity and documentation provided."
      }
    ]
  }
};

export function getContextualHelp(feature: string, language: string = "en"): ContextualHelp | null {
  const help = CONTEXTUAL_HELP[feature];
  if (!help) return null;
  
  // In a real implementation, you would translate the help content based on language
  return { ...help, language };
}

export function translateSystemPrompt(language: string): string {
  const prompts = {
    en: "You are a helpful AI assistant for ComplianceCheck. Help users with product scanning, compliance questions, filing complaints, and price analysis. Be concise and provide actionable advice.",
    hi: "आप ComplianceCheck के लिए एक सहायक AI असिस्टेंट हैं। उत्पाद स्कैनिंग, अनुपालन प्रश्न, शिकायत दर्ज करने और मूल्य विश्लेषण में उपयोगकर्ताओं की सहायता करें। संक्षिप्त रहें और व्यावहारिक सलाह दें।",
    bn: "আপনি ComplianceCheck-এর জন্য একজন সহায়ক AI সহায়ক। প্রোডাক্ট স্ক্যানিং, কমপ্লায়েন্স প্রশ্ন, অভিযোগ দাখিল এবং মূল্য বিশ্লেষণে ব্যবহারকারীদের সাহায্য করুন। সংক্ষিপ্ত থাকুন এবং কার্যকর পরামর্শ দিন।",
    ta: "நீங்கள் ComplianceCheck-க்கான ஒரு உதவிகரமான AI உதவியாளர். தயாரிப்பு ஸ்கேனிং், இணக்க கேள்விகள், புகார் தாக்கல் மற்றும் விலை பகுப்பாய்வில் பயனர்களுக்கு உதவுங்கள். சுருக்கமாக இருங்கள் மற்றும் நடைமுறை ஆலோசனை வழங்குங்கள்।"
  };
  
  return prompts[language as keyof typeof prompts] || prompts.en;
}