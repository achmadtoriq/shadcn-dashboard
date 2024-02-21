"use client";

import React, { useState, useEffect } from "react";

import { Github } from "lucide-react";
import { RotateCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { User, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";

import axios from "axios";

export function UserAuthForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  async function loginUser(event) {
    event.preventDefault();
    setIsLoading(true);

    console.log(data);
    const login = await axios.post("/api/login", data);

    console.log(login);
    // .then((res) => {
    //   console.log(res);
    //   toast.success("Sukses Login");
    //   // router.push("/auth/login");
    // })
    // .catch((err) => {
    //   console.log(err);
    //   toast.error("error login");
    // });

    if (login.status == 200) {
      if (login.data.status == 200) {
        toast.success(login.data.message);
        router.push("/dashboard");
      } else {
        toast.error(login.data.message);
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      }
    } else {
      toast.error("Error System");
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }

  }

  return (
    <div className="grid gap-6">
      <form onSubmit={loginUser} className="flex flex-col gap-y-4">
        <div className="relative flex items-center">
          <Input
            type="text"
            id="email"
            placeholder="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            value={data.email}
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
            }}
            disabled={isLoading}
          />
          <User className="absolute right-6" size={20} />
        </div>
        <div className="relative flex items-center">
          <Input
            type={!visible ? "password" : "text"}
            id="password"
            placeholder="password"
            value={data.password}
            onChange={(e) => {
              setData({ ...data, password: e.target.value });
            }}
            disabled={isLoading}
          />
          {visible ? (
            <Eye
              onClick={() => setVisible(!visible)}
              className="absolute right-6 cursor-pointer"
              size={20}
            />
          ) : (
            <EyeOff
              onClick={() => setVisible(!visible)}
              className="absolute right-6 cursor-pointer"
              size={20}
            />
          )}
        </div>
        <Button disabled={isLoading}>
          {isLoading && <RotateCw className="mr-2 h-4 w-4 animate-spin" />}
          Sign In with Email
        </Button>
      </form>
    </div>
  );
}
