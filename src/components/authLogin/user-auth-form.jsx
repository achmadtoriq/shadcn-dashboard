"use client";

import React, { useState } from "react";

import { Github } from "lucide-react";
import { RotateCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { User, Eye, EyeOff } from "lucide-react";

export function UserAuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    console.log(event.target.email.value);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={onSubmit} className="flex flex-col gap-y-4">
        <div className="relative flex items-center">
          <Input
            type="text"
            id="email"
            placeholder="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isLoading}
          />
          <User className="absolute right-6" size={20} />
        </div>
        <div className="relative flex items-center">
          <Input
            type={!visible ? "password" : "text"}
            id="password"
            placeholder="password"
            disabled={isLoading}
          />
          {visible && isLoading ? (
            <Eye
              onClick={() => setVisible(!visible)}
              className="absolute right-6 cursor-pointer"
              disabled={isLoading}
              size={20}
            />
          ) : (
            <EyeOff
              onClick={() => setVisible(!visible)}
              className="absolute right-6 cursor-pointer"
              disabled={isLoading}
              size={20}
            />
          )}
        </div>
        {/* <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="password"
              placeholder="name@example.com"
              type="password"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div> */}
        <Button disabled={isLoading}>
          {isLoading && <RotateCw className="mr-2 h-4 w-4 animate-spin" />}
          Sign In with Email
        </Button>
      </form>
    </div>
  );
}
