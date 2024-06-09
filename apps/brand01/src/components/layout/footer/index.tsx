import React from "react";
import FooterNav from "./footerNav";
import FooterSign from "./footerSign";
import { imageUrl } from "JF-core";

const Footer = () => {
  return (
    <footer className="mx-auto p-4 text-center">
      <div className="pt-8 pb-28 text-neutral-100 lg:pb-10">
        <div className="flex justify-center">
          <img
            src={imageUrl(`/img/jackfish-logo.png`)}
            alt="Footer Logo"
            className="mb-3"
          />
        </div>

        {/* 隱私權政策側標語和連結 */}
        <FooterSign />
      </div>
      {/* 手機版才會有的底部Nav */}
      <FooterNav />
    </footer>
  );
};

export default Footer;
