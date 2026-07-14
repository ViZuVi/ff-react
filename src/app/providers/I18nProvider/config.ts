import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { LANGS, DEFAULT_LANG } from "@/shared/locales/model";
import { resources } from "./resources";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    fallbackLng: DEFAULT_LANG,

    supportedLngs: LANGS,

    defaultNS: "common",

    ns: ["common", "auth"],

    resources: resources,

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
