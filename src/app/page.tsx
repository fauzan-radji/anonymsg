"use client";

import { Avatar, Room, Signup } from "@/components";

import strings from "@/values/strings";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function Home() {
  const [username, setUsername] = useLocalStorage("username", "");

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

      {username.length > 0 ? (
        <section className="flex flex-1 flex-col overflow-x-hidden overflow-y-scroll">
          {Array.from({ length: 10 }).map((_, i) => (
            <Room
              key={i}
              name={`room-${i + 1}`}
              preview="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla reprehenderit illum voluptates necessitatibus vel debitis ex inventore enim?"
            />
          ))}
        </section>
      ) : (
        <Signup setUsername={setUsername} />
      )}
    </main>
  );
}
