"use client";

import { Avatar, Signup as SignupComponent } from "@/components";

import { redirect } from "next/navigation";
import routes from "@/values/routes";
import strings from "@/values/strings";
import { useEffect } from "react";
import useSignupViewModel from "@/viewmodels/useSignupViewModel";

export default function Signup() {
  const { username, setUsername, isUsernameLoading } = useSignupViewModel();

  useEffect(() => {
    if (isUsernameLoading) return;
    if (username.length > 0) redirect(routes.home);
  }, [username, isUsernameLoading]);

  return (
    <main className="flex h-svh flex-col bg-slate-200 text-slate-900">
      <header className="bg-slate-400 px-4 py-2">
        <div className="container mx-auto flex items-center gap-4">
          <Avatar username="" size="medium" />
          <h1 className="text-xl font-bold">{strings.app_name}</h1>
        </div>
      </header>

      <SignupComponent setUsername={setUsername} />
    </main>
  );
}
