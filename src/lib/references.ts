import { collection, doc } from "firebase/firestore";
import { messageConverter, roomConverter } from "./converter";

import { firestore } from "./firestore";

/**
 * This function returns a reference to the messages **collection** in the specified room.
 * @param roomId The room ID.
 * @returns A reference to the messages collection in the specified room.
 */
export function messagesRef(roomId: string) {
  return collection(firestore, `rooms/${roomId}/messages`).withConverter(
    messageConverter,
  );
}

/**
 * This function returns a reference to the rooms **collection**.
 * @returns A reference to the rooms collection.
 */
export const roomsRef = collection(firestore, "rooms").withConverter(
  roomConverter,
);

/**
 * This function returns a reference to the specified room.
 * @param roomId The room ID.
 * @returns A reference to the specified room.
 */
export function roomRef(roomId: string) {
  return doc(roomsRef, roomId);
}
