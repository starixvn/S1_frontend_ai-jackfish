"use client";
import Link from "next/link";
import { useClientTranslation } from "@brand01/src/i18n/client";
import { useGetPathname } from "JF-core";
import { useAuthStore } from "JF-operations";
import Country from "./country";

const RightFunction = () => {
  const { locale } = useGetPathname();
  const { t } = useClientTranslation(locale);
  const { isLogin, onSignOut } = useAuthStore();

  return (
    <div className="flex items-center justify-end text-sm text-neutral-100">
      {isLogin && (
        <button
          onClick={onSignOut}
          className="font-headline text-body-md mx-2.5 w-28 rounded-full border-2 border-secondary-300 bg-gradient-to-t from-secondary-400 to-secondary-300 px-2 py-1.5 text-center font-semibold shadow-md"
        >
          {t("Label_General_LogOut")}
        </button>
      )}
      {!isLogin && (
        <>
          <Link
            href={"register"}
            className="font-headline text-body-md w-28 min-w-max rounded-full border-2 border-primary-400 bg-gradient-to-t from-primary-500 to-primary-400 px-2 py-1.5 text-center font-semibold shadow-md"
          >
            {t("Label_General_Register")}
          </Link>
          <Link
            href={"login"}
            className="font-headline text-body-md mx-2.5 w-28 rounded-full border-2 border-secondary-300 bg-gradient-to-t from-secondary-400 to-secondary-300 px-2 py-1.5 text-center font-semibold shadow-md"
          >
            {t("Label_General_LogIn")}
          </Link>
        </>
      )}

      <Country />
    </div>
  );
};

export default RightFunction;
