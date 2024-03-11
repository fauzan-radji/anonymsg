"use client";

import { Avatar, InputForm, SpeechBubbleRow } from "@/components";
import { useCallback, useEffect, useRef, useState } from "react";

import Link from "next/link";
import type { Message } from "@/types";
import Sheet from "@/components/Sheet";
import { redirect } from "next/navigation";
import routes from "@/values/routes";
import strings from "@/values/strings";
import { updateLastMessage } from "@/lib/firebase";
import useRoomViewModel from "@/viewmodels/useRoomViewModel";

export default function Room() {
  const {
    username,
    isUsernameLoading,
    roomId,
    room,
    messages,
    messageGroups,
    postMessage,
  } = useRoomViewModel();

  const dummyRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [sheetIsOpen, setSheetIsOpen] = useState(false);

  useEffect(() => {
    if (isUsernameLoading) return;
    if (username.length === 0) redirect(routes.signup);
  }, [username, isUsernameLoading]);

  useEffect(() => {
    dummyRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageGroups]);

  useEffect(() => {
    if (!messages?.length) return;

    const lastMessage = messages.at(-1) as Message;
    updateLastMessage(roomId, `${lastMessage.author}: ${lastMessage.text}`);
  }, [messages, roomId]);

  const handleSubmit = useCallback(() => {
    if (!(inputRef.current && inputRef.current.value)) return;
    postMessage(inputRef.current.value);
    inputRef.current.value = "";
  }, [postMessage]);

  return (
    <main className="flex h-svh flex-col bg-slate-200 text-slate-900">
      <header className="bg-slate-400 px-4 py-2 drop-shadow-md">
        <div className="container mx-auto flex items-center gap-4">
          <Link href={routes.home} className="text-2xl" title={strings.back}>
            🔙
          </Link>

          <div
            className="flex flex-auto cursor-pointer items-center gap-4"
            onClick={() => setSheetIsOpen(true)}
          >
            <Avatar username={roomId} size="medium" />
            <h1 className="text-xl font-bold">{room?.name}</h1>
          </div>
        </div>
      </header>

      <section className="flex-1 overflow-x-hidden overflow-y-scroll p-4">
        <div className="container mx-auto flex flex-col gap-4">
          {messageGroups.map((message) => (
            <SpeechBubbleRow
              key={message.id}
              message={message}
              fromMe={message.author === username}
            />
          ))}
          <span ref={dummyRef}></span>
        </div>
      </section>

      <footer className="p-4 pt-2">
        <InputForm onSubmit={handleSubmit} ref={inputRef} />
      </footer>

      <Sheet isOpen={sheetIsOpen} setOpen={setSheetIsOpen}>
        <Avatar username={roomId} size="gigantic" />
        <h2 className="text-xl font-bold">{room?.name}</h2>

        <p className="text-center">{room?.description}</p>
      </Sheet>
    </main>
  );
}
