"use client";
import React, { useState } from "react";

// components
import ThemeToggler from "./ThemeToggler";

const Header = () => {
  const [header, setHeader] = useState(false);
  return (
    <header className={`py-2 dark:bg-transparent absolute right-0 top-0 z-30 transition-all`}>
      <div className="container mx-auto">
        <div className="flex justify-end items-center ">
            <ThemeToggler />
        </div>
      </div>
    </header>
  );
};

export default Header;
