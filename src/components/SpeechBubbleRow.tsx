import Avatar from "./Avatar";
import { MessageGroup } from "@/types";
import SpeechBubbleGroup from "./SpeechBubbleGroup";

interface Props {
  message: MessageGroup;
  fromMe?: boolean;
}

export default function SpeechBubbleRow({ message, fromMe = false }: Props) {
  return (
    <div key={message.id} className="flex items-start gap-2">
      {fromMe ? (
        <>
          <SpeechBubbleGroup messages={message.messages} fromMe />

          <Avatar username={message.author} size="small" />
        </>
      ) : (
        <>
          <Avatar username={message.author} size="small" />

          <SpeechBubbleGroup messages={message.messages} />
        </>
      )}
    </div>
  );
}
