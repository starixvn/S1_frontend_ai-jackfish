import React from "react";
import FooterNav from "./footerNav";
import FooterSign from "./footerSign";

const Footer = () => {
  return (
    <footer className="mx-auto p-4 text-center">
      <div className="pt-8 pb-28 text-neutral-100 lg:pb-10">
        <div className="flex justify-center">
          {/*  eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://skplus.sgp1.digitaloceanspaces.com/usuncash/number9th/logo/3a797021f1924a2f939a5fcd2b7a720d.png"
            alt="footerLogo"
            className="mb-3"
          />
          {/* 🟠往後用圖範例 */}
          {/* <img
            alt="test"
            className="w-24"
            src={`${process.env.NEXT_PUBLIC_IMAGE_HOST}/img/footer/h5-icon-profile.svg`}
          /> */}
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
