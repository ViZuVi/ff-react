import "i18next";

import common from "@/shared/locales/en/common.json";
import auth from "@/shared/locales/en/auth.json";
import profile from "@/shared/locales/en/profile.json";
import main from "@/shared/locales/en/main.json";
import restore from "@/shared/locales/en/restore.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";

    resources: {
      common: typeof common;
      auth: typeof auth;
      profile: typeof profile;
      main: typeof main;
      restore: typeof restore;
    };
  }
}
