import { imageUrl } from "JF-core";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div className="col-span-4 flex items-center justify-center pr-6 text-neutral-100 md:col-span-3 lg:col-span-2">
      <Link href="/">
        <img src={imageUrl("/img/jackfish-logo.png")} alt="Header Logo" />
      </Link>
    </div>
  );
};

export default Logo;
