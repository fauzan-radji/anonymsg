"use client";

import { Avatar, Room } from "@/components";

import { redirect } from "next/navigation";
import routes from "@/values/routes";
import strings from "@/values/strings";
import { useEffect } from "react";
import useHomeViewModel from "@/viewmodels/useHomeViewModel";

export default function Home() {
  const { username, setUsername, isUsernameLoading, rooms } = useHomeViewModel();

  useEffect(() => {
    if (isUsernameLoading) return;
    if (username.length === 0) redirect(routes.signup);
  }, [username, isUsernameLoading]);

  return (
    <main className="flex h-svh flex-col bg-slate-200 text-slate-900">
      <header className="bg-slate-400 px-4 py-2">
        <div className="container mx-auto flex items-center gap-4">
          <Avatar username={username} size="medium" />
          <h1 className="text-xl font-bold">{username || "Anonymsg"}</h1>

          {username.length > 0 && (
            <button
              onClick={() => setUsername("")}
              className="ms-auto text-2xl"
              title={strings.signout}
            >
              🚪
            </button>
          )}
        </div>
      </header>

      <section className="flex flex-1 flex-col overflow-x-hidden overflow-y-scroll">
        {rooms?.map((room) => {
          const [author, ...rest] = room.lastMessage.split(": ");
          const text = rest.join(": ");
          const lastMessage = `${author === username ? strings.you : author}: ${text}`;
          return (
            <Room
              key={room.id}
              id={room.id}
              name={room.name}
              preview={lastMessage}
            />
          );
        })}
      </section>
    </main>
  );
}
