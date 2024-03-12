import type { Message, MessageGroup } from "@/types";
import { createMessage, getMessagesQuery } from "@/lib/firebase";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { useMemo, useState } from "react";

import { omit } from "@/utils";
import { roomRef } from "@/lib/references";
import useLocalStorage from "@/hooks/useLocalStorage";
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
  const [repliedMessage, setRepliedMessage] = useState<Message>();

  function postMessage(message: string) {
    if (!message) return;

    const replied = repliedMessage ? omit(repliedMessage, ["replied"]) : null;

    createMessage(roomId, {
      author: username,
      text: message,
      replied,
    });
  }

  return {
    username,
    isUsernameLoading,
    room,
    roomId,
    messages,
    messageGroups,
    postMessage,
    repliedMessage,
    setRepliedMessage,
  };
}
