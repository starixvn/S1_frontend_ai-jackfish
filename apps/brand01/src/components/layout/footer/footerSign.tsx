import { paths } from "JF-constants";
import Link from "next/link";
import React from "react";

const FooterSign = () => {
  return (
    <>
      <div className="flex justify-center gap-2">
        <Link href={paths.terms.root} className="hover:text-primary-400">
          Terms and Conditions of Service
        </Link>
        ．
        <Link href={paths.privacy.root} className="hover:text-primary-400">
          Privacy Policy
        </Link>
      </div>
      <span className="text-body-sm mt-1 block w-full text-center text-xs text-neutral-100 opacity-80">
        Copyright © WWW, All Rights Reserved.
      </span>
    </>
  );
};

export default FooterSign;
