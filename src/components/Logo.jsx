import React from "react";
import Link from "next/link";

const Logo = () => {
  return (
    <div>
      <Link href={"/"}>
        <h1 className="passion-one-black text-5xl py-2 px-3 dark:text-primary">
          thor.
        </h1>
      </Link>
    </div>
  );
};

export default Logo;
