import commonEn from "@/shared/locales/en/auth.json";
import authEn from "@/shared/locales/en/common.json";
import profileEn from "@/shared/locales/en/profile.json";

import commonRu from "@/shared/locales/ru/auth.json";
import authRu from "@/shared/locales/ru/common.json";
import profileRu from "@/shared/locales/ru/profile.json";

export const resources = {
  en: {
    common: commonEn,
    auth: authEn,
    profile: profileEn,
  },
  ru: {
    common: commonRu,
    auth: authRu,
    profile: profileRu,
  },
} as const;
