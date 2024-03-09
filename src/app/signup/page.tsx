"use client";

import { Avatar, Signup as SignupComponent } from "@/components";

import { redirect } from "next/navigation";
import strings from "@/values/strings";
import { useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function Signup() {
  const [username, setUsername, isFirstTimeLoad] = useLocalStorage(
    "username",
    "",
  );

  useEffect(() => {
    if (isFirstTimeLoad) return;
    if (username.length > 0) {
      redirect("/");
    }
  }, [username, isFirstTimeLoad]);

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
