import { ContextMenuAction } from "./ContextMenu";
import type { Message } from "@/types";
import SpeechBubble from "./SpeechBubble";
import strings from "@/values/strings";
import swipeable from "@/hoc/swipeable";
import withContextMenu from "@/hoc/withContextMenu";

interface Props {
  messages: Message[];
  fromMe?: boolean;
  onReply: (message: Message) => void;
}

const SwipeableSpeechBubble = swipeable(SpeechBubble, 50);
const WithContextMenuSwipeableSpeechBubble = withContextMenu(
  SwipeableSpeechBubble,
);

export default function SpeechBubbleGroup({
  messages,
  fromMe = false,
  onReply,
}: Props) {
  function getContextMenuOptions(message: Message): ContextMenuAction[] {
    return [
      {
        text: strings.reply,
        action() {
          onReply(message);
        },
      },
    ];
  }

  return fromMe ? (
    <div className="ms-auto flex max-w-[calc(100%_-_4rem)] flex-col items-end gap-1 md:max-w-prose">
      {messages.map((message, index) => (
        <WithContextMenuSwipeableSpeechBubble
          message={message}
          fromMe
          key={message.id}
          first={index === 0}
          onSwipe={() => onReply(message)}
          direction="left"
          actions={getContextMenuOptions(message)}
        />
      ))}
    </div>
  ) : (
    <div className="flex max-w-[calc(100%_-_4rem)] flex-col gap-1 md:max-w-prose">
      {messages.map((message, index) => (
        <WithContextMenuSwipeableSpeechBubble
          message={message}
          key={message.id}
          first={index === 0}
          onSwipe={() => onReply(message)}
          direction="right"
          actions={getContextMenuOptions(message)}
        />
      ))}
    </div>
  );
}
