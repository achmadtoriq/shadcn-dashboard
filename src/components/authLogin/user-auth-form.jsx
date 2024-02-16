"use client";

import React, { useState, useEffect } from "react";

import { Github } from "lucide-react";
import { RotateCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn, useSession } from "next-auth/react";

import { User, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

import { toast } from 'react-hot-toast'

export function UserAuthForm() {
  const router = useRouter();
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/dashboard");
    }
  });

  async function loginUser(event) {
    event.preventDefault();
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      if(callback?.error) {
        toast.error(callback.error);
      }

      if(callback?.ok) {
        toast.success('logged success !')
        router.push("/dashboard");
      }
      
    });
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
