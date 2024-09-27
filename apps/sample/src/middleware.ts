import { NextRequest } from "next/server";
import { localesMiddleware } from "JF-core/middleware";
import { fallbackLng, languages, cookieName } from "./i18n/settings";

const config = {
  matcher: [
    "/((?!api/|img/|_next/|health|favicon.ico|sw.js|site.webmanifest|[^/]+/Cashier/|block-ip).*)",
  ],
};

export function middleware(req: NextRequest) {
  return localesMiddleware({
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
