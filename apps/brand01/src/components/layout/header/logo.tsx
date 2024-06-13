import { imageUrl } from "JF-core";
import Link from "next/link";
import React from "react";
import { paths } from "JF-constants";

const Logo = () => {
  return (
    <div className="col-span-4 flex items-center justify-center pr-6 text-neutral-100 md:col-span-3 lg:col-span-2">
      <Link href={paths.home.root}>
        <img src={imageUrl("/img/jackfish-logo.png")} alt="Header Logo" />
      </Link>
    </div>
  );
};

export default Logo;
