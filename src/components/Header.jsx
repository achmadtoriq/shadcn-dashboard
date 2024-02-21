// "use client";
import React from "react";

// components
import ThemeToggler from "./ThemeToggler";
import Logo from "./Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cookies } from "next/headers";

const Header = () => {
  const cookieStore = cookies()
  const data_info = cookieStore.get('detailInfo')

  return (
    <header
      className={`py-2 bg-slate-600 dark:bg-transparent right-0 top-0 z-30 transition-all`}
    >
      <div className="container mx-auto">
        <div className="flex justify-end items-center">
          {/* <Logo /> */}
          <div className="flex items-center gap-x-6">
            <h1>{JSON.parse(data_info.value).name}</h1>
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
