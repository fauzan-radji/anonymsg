import { createMessage, getMessagesQuery } from "@/lib/firebase";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";

import type { MessageGroup } from "@/types";
import { roomRef } from "@/lib/references";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useMemo } from "react";
import { useParams } from "next/navigation";

export default function useRoomViewModel() {
  const [username, _, isUsernameLoading] = useLocalStorage("username", "");
  const roomId = useParams().roomId as string;
  const [room] = useDocumentData(roomRef(roomId));
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

  function postMessage(message: string) {
    if (!message) return;
    createMessage(roomId, { author: username, text: message });
  }

  return {
    username,
    isUsernameLoading,
    room,
    roomId,
    messages,
    messageGroups,
    postMessage,
  };
}
