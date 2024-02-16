import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { UserAuthForm } from "@/components/authLogin/user-auth-form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export const metadata = {
  title: "Authentication",
  // description: "Authentication forms built using the components.",
};

const Login = () => {

  return (
    <>
      <div className="container min-h-screen flex flex-row items-center justify-center">
        <Card className="w-[350px]">
          <CardHeader className='text-center'>
            <CardTitle>Create project</CardTitle>
            <CardDescription>
              Deploy your new project in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UserAuthForm />
          </CardContent>
        </Card>
      </div>
      {/* <div className="container h-min-screen flex flex-row items-center justify-center">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <UserAuthForm/>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Login;
