"use client";
import React from "react";
import Link from "next/link";
import { useClientTranslation } from "@brand01/src/i18n/client";
import { INavMenuProps, MENU_NAV_DATA } from "@brand01/src/data/layout/header";
import classNames from "classnames";
import { useGetPathname } from "core";

const Menu = () => {
  const { locale, routeName } = useGetPathname();
  const { t } = useClientTranslation(locale);

  return (
    <div>
      <div className="font-headline mx-2 hidden items-center gap-2 text-neutral-100 lg:flex">
        {MENU_NAV_DATA.map((value: INavMenuProps) => {
          const { displayKey, pathname, active } = value;
          return (
            <div key={displayKey}>
              <Link
                href={pathname}
                className={classNames(
                  "whitespace-nowrap px-4 py-2 hover:border-b-2 hover:border-primary-400",
                  {
                    "border-b-2 border-primary-400": active === routeName,
                  },
                )}
              >
                {t(displayKey)}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
