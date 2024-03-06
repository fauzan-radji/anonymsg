import Avatar from "./Avatar";
import { MessageGroup } from "@/types";
import SpeechBubbleGroup from "./SpeechBubbleGroup";

interface Props {
  message: MessageGroup;
  fromMe?: boolean;
}

export default function SpeechBubbleRow({ message, fromMe = false }: Props) {
  return (
    <div key={message.id} className="flex gap-2 items-start">
      {fromMe ? (
        <>
          <SpeechBubbleGroup messages={message.messages} fromMe />

          <Avatar username={message.author} />
        </>
      ) : (
        <>
          <Avatar username={message.author} />

          <SpeechBubbleGroup messages={message.messages} />
        </>
      )}
    </div>
  );
}
