import { NextRequest } from "next/server";
import { appMiddleware, middlewareConfig as config } from "JF-core/middleware";
import { fallbackLng, languages, cookieName } from "./i18n/settings";

export function middleware(req: NextRequest) {
  return appMiddleware({
    req,
    configs: {
      fallbackLng,
      languages,
      cookieName,
    },
  });
}

// NextJS 官方定義的 config 寫法
export { config };
