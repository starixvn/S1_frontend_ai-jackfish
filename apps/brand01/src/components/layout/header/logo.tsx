import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div className="col-span-4 flex items-center justify-center pr-6 text-neutral-100 md:col-span-3 lg:col-span-2">
      <Link href="/">
        <img
          src="https://skplus.sgp1.digitaloceanspaces.com/usuncash/number9th/logo/3a797021f1924a2f939a5fcd2b7a720d.png"
          alt=""
        />
      </Link>
    </div>
  );
};

export default Logo;
