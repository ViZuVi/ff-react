import "i18next";

import common from "@/shared/locales/en/common.json";
import auth from "@/shared/locales/en/auth.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";

    resources: {
      common: typeof common;
      auth: typeof auth;
    };
  }
}