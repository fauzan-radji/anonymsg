import {
  type DocumentData,
  addDoc,
  limit,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { Message, Room } from "@/types";
import { messagesRef, roomRef, roomsRef } from "./references";

export function getMessagesQuery(
  roomId: string,
  options: {
    limit: number;
  },
) {
  return query<Message, DocumentData>(
    messagesRef(roomId),
    orderBy("createdAt"),
    limit(options.limit),
  );
}

export function getRoomsQuery(options: { limit: number }) {
  return query<Room, DocumentData>(
    roomsRef,
    orderBy("updatedAt"),
    limit(options.limit),
  );
}

export function createMessage(roomId: string, data: Omit<Message, "id">) {
  return addDoc(messagesRef(roomId), data);
}

export function updateLastMessage(roomId: string, lastMessage: string) {
  return updateDoc(roomRef(roomId), { lastMessage });
}
