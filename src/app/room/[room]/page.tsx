"use client";

import {
  type FormEvent,
  type FormEventHandler,
  useRef,
  useMemo,
  useEffect,
} from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import type { Message, MessageGroup } from "@/types";
import { InputForm, Signup, SpeechBubbleRow, Avatar } from "@/components";
import { createMessage, getMessagesQuery } from "@/lib/firebase";
import useLocalStorage from "@/hooks/useLocalStorage";
import { redirect, useParams } from "next/navigation";
import Link from "next/link";
import strings from "@/values/strings";

export default function Room() {
  const dummyRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const room = useParams().room as string;
  const [username, setUsername, firstTimeLoad] = useLocalStorage(
    "username",
    "",
  );

  useEffect(() => {
    if (firstTimeLoad) return;
    if (username.length === 0) redirect("/");
  }, [username, firstTimeLoad]);

  const query = getMessagesQuery({ limit: 25 });
  const [documentData] = useCollectionData<Message>(query);
  const messages: MessageGroup[] = useMemo(() => {
    if (!documentData) return [];

    const messages: MessageGroup[] = [];
    for (const message of documentData) {
      const lastMessage = messages.at(-1);
      if (lastMessage && lastMessage.author === message.author) {
        lastMessage.messages.push(message);
      } else {
        messages.push({
          id: message.id,
          author: message.author,
          messages: [message],
        });
      }
    }

    return messages;
  }, [documentData]);

  useEffect(() => {
    dummyRef.current?.scrollIntoView();
  }, [messages]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    if (!(inputRef.current && inputRef.current.value)) return;
    const author = username;
    const text = inputRef.current.value;
    inputRef.current.value = "";

    await createMessage({ author, text });
  };

  return (
    <main className="flex h-svh flex-col bg-slate-200 text-slate-900">
      <header className="bg-slate-400 px-4 py-2">
        <div className="container mx-auto flex items-center gap-4">
          <Link href="/" className="text-2xl" title={strings.back}>
            🔙
          </Link>

          <Avatar username={room} size="medium" />
          <h1 className="text-xl font-bold">{room}</h1>
        </div>
      </header>
      {username.length > 0 ? (
        <>
          <section className="flex-1 overflow-x-hidden overflow-y-scroll p-4">
            <div className="container mx-auto flex flex-col gap-4">
              {messages.map((message) => (
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
        </>
      ) : (
        <Signup setUsername={setUsername} />
      )}
    </main>
  );
}
