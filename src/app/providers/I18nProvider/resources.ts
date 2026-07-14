import commonEn from "@/shared/locales/en/auth.json";
import authEn from "@/shared/locales/en/common.json";

import commonRu from "@/shared/locales/ru/auth.json";
import authRu from "@/shared/locales/ru/common.json";

export const resources = {
  en: {
    common: commonEn,
    auth: authEn,
  },
  ru: {
    common: commonRu,
    auth: authRu,
  },
} as const;
