import {
  DocumentData,
  DocumentReference,
  Query,
  QueryDocumentSnapshot,
  SnapshotOptions,
  addDoc,
  collection,
  getFirestore,
  limit,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import { Message } from "@/types";
import { initializeApp } from "firebase/app";

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
});

const converter = {
  toFirestore: (data: Message): DocumentData => {
    return {
      author: data.author,
      text: data.text,
      createdAt: serverTimestamp(),
    };
  },
  fromFirestore: (
    snap: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Message => {
    const data = snap.data(options);
    return {
      id: snap.id,
      author: data.author,
      text: data.text,
    };
  },
};

const firestore = getFirestore(app);
const messagesRef = collection(firestore, "messages").withConverter(converter);

export function getMessagesQuery(options: {
  limit: number;
}): Query<Message, DocumentData> {
  return query<Message, DocumentData>(
    messagesRef,
    orderBy("createdAt"),
    limit(options.limit)
  );
}

export function createMessage(
  data: Omit<Message, "id">
): Promise<DocumentReference<Omit<Message, "id">, DocumentData>> {
  return addDoc(messagesRef, data);
}
