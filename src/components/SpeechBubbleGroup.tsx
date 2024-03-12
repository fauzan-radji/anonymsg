import type { Message } from "@/types";
import SpeechBubble from "./SpeechBubble";
import swipeable from "@/hoc/swipeable";

interface Props {
  messages: Message[];
  fromMe?: boolean;
  onReply: (message: Message) => void;
}

const SwipeableSpeechBubble = swipeable(SpeechBubble);

export default function SpeechBubbleGroup({
  messages,
  fromMe = false,
  onReply,
}: Props) {
  return fromMe ? (
    <div className="ms-auto flex max-w-[calc(100%_-_4rem)] flex-col items-end gap-1 md:max-w-prose">
      {messages.map((message, index) => (
        <SwipeableSpeechBubble
          message={message}
          fromMe
          key={message.id}
          first={index === 0}
          onSwipe={() => onReply(message)}
          direction="left"
        />
      ))}
    </div>
  ) : (
    <div className="flex max-w-[calc(100%_-_4rem)] flex-col gap-1 md:max-w-prose">
      {messages.map((message, index) => (
        <SwipeableSpeechBubble
          message={message}
          key={message.id}
          first={index === 0}
          onSwipe={() => onReply(message)}
          direction="right"
        />
      ))}
    </div>
  );
}
