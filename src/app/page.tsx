"use client";

import { type FormEvent, type FormEventHandler, useRef, useMemo } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import type { Message, MessageGroup } from "@/types";
import { InputForm, Signup, SpeechBubbleRow } from "@/components";
import { createMessage, getMessagesQuery } from "@/lib/firebase";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function Home() {
  const dummyRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useLocalStorage("username", "");
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

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!(inputRef.current && inputRef.current.value)) return;
    const author = username;
    const text = inputRef.current.value;
    inputRef.current.value = "";

    await createMessage({ author, text });
    dummyRef.current?.scrollIntoView();
  };

  return (
    <main className="bg-slate-200 flex flex-col h-svh text-slate-900">
      <header className="py-2 px-4 bg-slate-400">
        <div className="flex gap-4 container mx-auto items-center">
          <div className="w-10 aspect-square bg-slate-300 rounded-full"></div>
          <h1 className="font-bold text-xl">Anonymsg</h1>
        </div>
      </header>
      {username === "" ? (
        <Signup setUsername={setUsername} />
      ) : (
        <>
          <section className="px-4 py-4 flex-1 overflow-y-scroll overflow-x-hidden">
            <div className="container flex flex-col gap-4 mx-auto">
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
          <footer className="pt-2 pb-4 px-4">
            <InputForm onSubmit={handleSubmit} ref={inputRef} />
          </footer>
        </>
      )}
    </main>
  );
}
