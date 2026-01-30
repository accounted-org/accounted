import { defineRouting } from "next-intl/routing";
import { Locales, locales } from "../../constants";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: locales,

  // Used when no locale matches
  defaultLocale: Locales.PT_BR,
});
