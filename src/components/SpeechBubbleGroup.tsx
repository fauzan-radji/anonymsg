import { Message } from "@/types";
import SpeechBubble from "./SpeechBubble";

export default function SpeechBubbleGroup({
  messages,
  fromMe = false,
}: {
  messages: Message[];
  fromMe?: boolean;
}) {
  return fromMe ? (
    <div className="flex flex-col gap-1 items-end max-w-[calc(100%_-_2rem)] md:max-w-prose ms-auto">
      {messages.map(({ id, text }) => (
        <SpeechBubble fromMe key={id}>
          {text}
        </SpeechBubble>
      ))}
    </div>
  ) : (
    <div className="flex flex-col gap-1 flex-1 md:max-w-prose">
      {messages.map(({ id, text }) => (
        <SpeechBubble key={id}>{text}</SpeechBubble>
      ))}
    </div>
  );
}
