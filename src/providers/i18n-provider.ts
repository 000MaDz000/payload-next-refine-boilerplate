"use client";

import { I18nProvider } from "@refinedev/core";
import Cookies from "js-cookie";

import ar from "../../locales/ar.json";
import en from "../../locales/en.json";

const translations: Record<string, any> = {
  ar,
  en,
};

export const i18nProvider: I18nProvider = {
  translate: (key: string, options?: any, defaultMessage?: string) => {
    const locale = Cookies.get("NEXT_LOCALE") || "en";

    // Support nested keys (e.g., "categories.fields.title")
    const translation = key.split('.').reduce((obj, i) => obj?.[i], translations[locale]);

    if (translation && typeof translation === "string") {
      let text = translation;
      if (options) {
        Object.entries(options).forEach(([k, v]) => {
          text = text.replaceAll(`{{${k}}}`, String(v));
          text = text.replaceAll(`{${k}}`, String(v));
        });
      }
      return text;
    }

    return defaultMessage || key;
  },
  changeLocale: async (locale: string) => {
    Cookies.set("NEXT_LOCALE", locale);
    // Refresh the page to apply changes
    window.location.reload();
  },
  getLocale: () => {
    return Cookies.get("NEXT_LOCALE") || "en";
  },
};
