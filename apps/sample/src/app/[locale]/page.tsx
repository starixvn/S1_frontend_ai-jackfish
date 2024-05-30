"use client";

import { changeTheme } from "JF-core";
import { useClientTranslation } from "../../i18n/client";

import Link from "next/link";

export default function Home({
  params: { locale },
}: {
  params: {
    locale: string;
  };
}) {
  const { t } = useClientTranslation(locale);
  // const code = checkSignIn()
  return (
    <div className="grid min-h-full grid-rows-3 place-items-center bg-primary">
      <div className="text-center">
        <h2 className="py-0 text-lg text-warning">
          This is a Client side i18n sample
        </h2>
        <h3 className="text-tertiary">{t("Label_APP_DOWNLOAD")}</h3>
        <h3 className="text-tertiary">{`ENV is ${process.env.NEXT_PUBLIC_ENV_DB_HOST}`}</h3>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <button
          className="m-2 bg-tertiary py-2 px-8 text-neutral-500"
          onClick={() => changeTheme("")}
        >
          {t("Label_Deposit_Crypto")}
        </button>
        <button
          className="m-2 bg-tertiary py-2 px-8 text-neutral-500"
          onClick={() => changeTheme("theme1")}
        >
          theme 1
        </button>
        <button
          className="m-2 bg-tertiary py-2 px-8 text-neutral-500"
          onClick={() => changeTheme("theme2")}
        >
          theme 2
        </button>
        <button
          className="m-2 bg-tertiary py-2 px-8 text-neutral-500"
          onClick={() => changeTheme("theme3")}
        >
          theme 3
        </button>
        <Link
          className="m-2 bg-tertiary py-2 px-8 text-neutral-500"
          href="./cs"
        >
          Switch to CS
        </Link>
        <Link
          className="m-2 bg-tertiary py-2 px-8 text-neutral-500"
          href="./en"
        >
          Switch to EN
        </Link>
        <Link className="m-2 bg-tertiary py-2 px-8 text-neutral-500" href="/jp">
          Switch to JP
        </Link>
        <Link
          className="m-2 bg-tertiary py-2 px-8 text-neutral-500"
          href={`/${locale}/server-page`}
        >
          Go To ServerPage
        </Link>
      </div>
    </div>
  );
}
