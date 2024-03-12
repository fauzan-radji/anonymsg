export interface Message {
  id: string;
  author: string;
  text: string;
  replied: Omit<Message, "replied"> | null;
}
