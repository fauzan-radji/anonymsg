import type { Message, Room } from "@/types";
import {
  type DocumentData,
  type QueryDocumentSnapshot,
  type SnapshotOptions,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";

export const messageConverter = {
  toFirestore: (data: Message): DocumentData => {
    return {
      author: data.author,
      text: data.text,
      createdAt: serverTimestamp(),
    };
  },
  fromFirestore: (
    snap: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): Message => {
    const data = snap.data(options);
    return {
      id: snap.id,
      author: data.author,
      text: data.text,
    };
  },
};

export const roomConverter = {
  toFirestore: (data: Room): DocumentData => {
    return {
      name: data.name,
      description: data.description,
      lastMessage: data.lastMessage,
      createdAt: Timestamp.fromDate(data.createdAt),
      updatedAt: serverTimestamp(),
    };
  },
  fromFirestore: (
    snap: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): Room => {
    const data = snap.data(options);
    return {
      id: snap.id,
      name: data.name,
      description: data.description,
      lastMessage: data.lastMessage,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    };
  },
};
