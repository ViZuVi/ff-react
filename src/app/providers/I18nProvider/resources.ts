import commonEn from "@/shared/locales/en/common.json";
import authEn from "@/shared/locales/en/auth.json";
import profileEn from "@/shared/locales/en/profile.json";
import mainEn from "@/shared/locales/en/main.json";

import commonRu from "@/shared/locales/ru/common.json";
import authRu from "@/shared/locales/ru/auth.json";
import profileRu from "@/shared/locales/ru/profile.json";
import mainRu from "@/shared/locales/ru/main.json";

export const resources = {
  en: {
    common: commonEn,
    auth: authEn,
    profile: profileEn,
    main: mainEn,
  },
  ru: {
    common: commonRu,
    auth: authRu,
    profile: profileRu,
    main: mainRu,
  },
} as const;
