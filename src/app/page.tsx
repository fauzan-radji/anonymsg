"use client";

import { type FormEvent, type FormEventHandler, useRef, useMemo } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import type { Message, MessageGroup } from "@/types";
import { SpeechBubbleRow } from "@/components";
import { createMessage, getMessagesQuery } from "@/lib/firebase";

export default function Home() {
  const dummyRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
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

    await createMessage({
      author: "Jane Doe", // FIXME
      text: inputRef.current.value,
    });

    inputRef.current.value = "";
    dummyRef.current?.scrollIntoView();
  };

  return (
    <main className="bg-slate-200 flex flex-col h-svh text-slate-900">
      <header className="py-2 px-4 bg-slate-400">
        <div className="flex gap-4 container mx-auto items-center">
          <div className="w-10 aspect-square bg-slate-300 rounded-full"></div>
          <h1 className="font-bold text-xl">Welcome</h1>
        </div>
      </header>
      <section className="px-4 py-4 flex-1 overflow-scroll">
        <div className="container flex flex-col gap-2 mx-auto">
          <SpeechBubbleRow messages={messages} />
          <span ref={dummyRef}></span>
        </div>
      </section>
      <footer className="pt-2 pb-4 px-4">
        <form
          onSubmit={handleSubmit}
          className="container flex mx-auto bg-slate-300 rounded-full overflow-hidden outline-slate-50 outline-2 focus-within:outline -outline-offset-2"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Ketik sesuatu ..."
            className="bg-transparent flex-1 min-w-0 placeholder:text-slate-900/50 outline-none px-4"
          />
          <button
            type="submit"
            className="bg-transparent w-12 aspect-square text-2xl flex items-center justify-center outline-none"
          >
            ➤
          </button>
        </form>
      </footer>
    </main>
  );
}
