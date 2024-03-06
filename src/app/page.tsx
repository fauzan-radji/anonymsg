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
          <div className="aspect-square w-10 rounded-full bg-slate-300"></div>
          <h1 className="text-xl font-bold">Anonymsg</h1>
        </div>
      </header>
      {username === "" ? (
        <Signup setUsername={setUsername} />
      ) : (
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
      )}
    </main>
  );
}
