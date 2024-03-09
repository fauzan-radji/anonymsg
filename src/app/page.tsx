"use client";

import { Avatar, Room } from "@/components";

import { getRoomsQuery } from "@/lib/firebase";
import { redirect } from "next/navigation";
import strings from "@/values/strings";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function Home() {
  const [username, setUsername, isFirstTimeLoad] = useLocalStorage(
    "username",
    "",
  );

  useEffect(() => {
    if (isFirstTimeLoad) return;
    if (username.length === 0) {
      redirect("/signup");
    }
  }, [username, isFirstTimeLoad]);

  const [rooms] = useCollectionData(getRoomsQuery({ limit: 10 }));

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
