"use client";
import React, { useState } from "react";

// components
import ThemeToggler from "./ThemeToggler";
import Logo from "./Logo";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const [header, setHeader] = useState(false);
  const { data: session } = useSession();

  return (
    <header
      className={`py-2 dark:bg-transparent right-0 top-0 z-30 transition-all`}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-x-6">
            <h1>{session?.user.name}</h1>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
        {/* <div className="flex justify-end items-center ">
          <ThemeToggler />
        </div> */}
      </div>
    </header>
  );
};

export default Header;
