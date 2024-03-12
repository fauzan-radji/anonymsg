import type { Message, MessageGroup } from "@/types";

import Avatar from "./Avatar";
import SpeechBubbleGroup from "./SpeechBubbleGroup";

interface Props {
  message: MessageGroup;
  fromMe?: boolean;
  onReply: (message: Message) => void;
}

export default function SpeechBubbleRow({
  message,
  fromMe = false,
  onReply,
}: Props) {
  return (
    <div key={message.id} className="flex items-start gap-2">
      {fromMe ? (
        <>
          <SpeechBubbleGroup
            messages={message.messages}
            fromMe
            onReply={onReply}
          />

          <Avatar username={message.author} size="small" />
        </>
      ) : (
        <>
          <Avatar username={message.author} size="small" />

          <SpeechBubbleGroup messages={message.messages} onReply={onReply} />
        </>
      )}
    </div>
  );
}
