"use client";

import { Avatar, InputForm, SpeechBubbleRow } from "@/components";
import type { Message, MessageGroup } from "@/types";
import {
  createMessage,
  getMessagesQuery,
  updateLastMessage,
} from "@/lib/firebase";
import { redirect, useParams } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";

import Link from "next/link";
import strings from "@/values/strings";
import { useCollectionData } from "react-firebase-hooks/firestore";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function Room() {
  const dummyRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const roomId = useParams().roomId as string;
  const [username, _, firstTimeLoad] = useLocalStorage("username", "");

  useEffect(() => {
    if (firstTimeLoad) return;
    if (username.length === 0) redirect("/signup");
  }, [username, firstTimeLoad]);

  const query = getMessagesQuery(roomId, { limit: 25 });
  const [messages] = useCollectionData<Message>(query);
  const messageGroups: MessageGroup[] = useMemo(() => {
    if (!messages) return [];

    const messageGroups: MessageGroup[] = [];
    for (const message of messages) {
      const lastMessage = messageGroups.at(-1);
      if (lastMessage && lastMessage.author === message.author) {
        lastMessage.messages.push(message);
      } else {
        messageGroups.push({
          id: message.id,
          author: message.author,
          messages: [message],
        });
      }
    }

    return messageGroups;
  }, [messages]);

  useEffect(() => {
    dummyRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageGroups]);

  useEffect(() => {
    if (messages?.length) {
      const lastMessage = messages.at(-1) as Message;
      updateLastMessage(roomId, `${lastMessage.author}: ${lastMessage.text}`);
    }
  }, [messages, roomId]);

  const handleSubmit = async () => {
    if (!(inputRef.current && inputRef.current.value)) return;
    const author = username;
    const text = inputRef.current.value;
    inputRef.current.value = "";

    await createMessage(roomId, { author, text });
  };

  return (
    <main className="flex h-svh flex-col bg-slate-200 text-slate-900">
      <header className="bg-slate-400 px-4 py-2">
        <div className="container mx-auto flex items-center gap-4">
          <Link href="/" className="text-2xl" title={strings.back}>
            🔙
          </Link>

          <Avatar username={roomId} size="medium" />
          <h1 className="text-xl font-bold">{roomId}</h1>
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
    </main>
  );
}
