"use client";
import {
  FOOTER_NAV_LEFT_DATA,
  FOOTER_NAV_RIGHT_DATA,
  IFooterNavProps,
} from "@brand01/src/data/layout/footer";
import { useClientTranslation } from "@brand01/src/i18n/client";
import { imageUrl, useGetPathname } from "JF-core";
import Link from "next/link";
import React from "react";

const FooterNav = () => {
  const { locale } = useGetPathname();
  const { t } = useClientTranslation(locale);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 bg-neutral-500 lg:hidden">
      <div className="box-shadow grid w-full grid-cols-2 justify-between overflow-hidden px-2 pb-4">
        {/* 左邊三個 */}
        <div className="flex justify-evenly">
          {FOOTER_NAV_LEFT_DATA.map((value: IFooterNavProps) => {
            const { displayKey, pathname, iconPath } = value;

            return (
              <div role="button" key={displayKey}>
                <Link
                  href={pathname}
                  className="text-sk-grey-400 flex flex-col items-center justify-center pt-3 text-center"
                >
                  <img
                    src={imageUrl(`/img/footer/${iconPath}`)}
                    alt={`icon-${displayKey}`}
                    className="h-6 w-6"
                  />
                  <div className="text-body-sm font-subtitle dark:text-sk-grey-400 mt-1 whitespace-nowrap text-xs text-neutral-300">
                    {t(displayKey)}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* 橘色小ＬＯＧＯ */}
        <Link
          href={"/"}
          className="absolute -top-7 left-1/2 z-30 h-14 w-14 translate-x-[-50%] rounded-full bg-primary-400"
        >
          <div className="mx-auto my-4 h-6 w-6">
            <img
              src={imageUrl("/img/footer/h5-icon-home.svg")}
              alt="icon-home"
              className="h-full w-full"
            />
          </div>
        </Link>

        {/* 右邊兩個 */}
        <div className="flex justify-evenly">
          {FOOTER_NAV_RIGHT_DATA.map((value) => {
            const { displayKey, pathname, iconPath } = value;

            return (
              <div role="button" key={displayKey}>
                <Link
                  href={pathname}
                  className="text-sk-grey-400 flex flex-col items-center justify-center pt-3 text-center"
                >
                  <img
                    src={imageUrl(`/img/footer/${iconPath}`)}
                    alt={`icon-${displayKey}`}
                    className="h-6 w-6"
                  />
                  <div className="text-body-sm font-subtitle dark:text-sk-grey-400 mt-1 whitespace-nowrap text-xs text-neutral-300">
                    {t(displayKey)}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FooterNav;
