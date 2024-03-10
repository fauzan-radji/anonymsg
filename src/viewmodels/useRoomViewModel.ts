import { createMessage, getMessagesQuery } from "@/lib/firebase";
import { useMemo, useRef } from "react";

import type { MessageGroup } from "@/types";
import { useCollectionData } from "react-firebase-hooks/firestore";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useParams } from "next/navigation";

export default function useRoomViewModel() {
  const dummyRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [username, _, isUsernameLoading] = useLocalStorage("username", "");
  const roomId = useParams().roomId as string;
  const [messages] = useCollectionData(getMessagesQuery(roomId, { limit: 25 }));
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

  const handleSubmit = () => {
    if (!(inputRef.current && inputRef.current.value)) return;
    const author = username;
    const text = inputRef.current.value;
    inputRef.current.value = "";

    createMessage(roomId, { author, text });
  };

  return {
    dummyRef,
    inputRef,
    username,
    isUsernameLoading,
    roomId,
    messages,
    messageGroups,
    handleSubmit,
  };
}
