import type { Message } from "@/types";
import SpeechBubble from "./SpeechBubble";

interface Props {
  messages: Message[];
  fromMe?: boolean;
}

export default function SpeechBubbleGroup({ messages, fromMe = false }: Props) {
  return fromMe ? (
    <div className="ms-auto flex max-w-[calc(100%_-_4rem)] flex-col items-end gap-1 md:max-w-prose">
      {messages.map((message, index) => (
        <SpeechBubble
          message={message}
          fromMe
          key={message.id}
          first={index === 0}
        />
      ))}
    </div>
  ) : (
    <div className="flex max-w-[calc(100%_-_4rem)] flex-col gap-1 md:max-w-prose">
      {messages.map((message, index) => (
        <SpeechBubble message={message} key={message.id} first={index === 0} />
      ))}
    </div>
  );
}
