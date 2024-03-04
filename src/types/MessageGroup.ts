import type { Message } from "./Message";

export interface MessageGroup {
  id: string;
  author: string;
  messages: Message[];
}
