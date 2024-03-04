import Image from "next/image";
import { MessageGroup } from "@/types";
import SpeechBubbleGroup from "./SpeechBubbleGroup";

const API_KEY = process.env.NEXT_PUBLIC_MULTIAVATAR_API_KEY;
const loader = ({ src }: { src: string }) => {
  return `https://api.multiavatar.com/${src}.png?apikey=${API_KEY}`;
};

export default function SpeechBubbleRow({
  messages,
}: {
  messages: MessageGroup[];
}) {
  return messages.map((message) =>
    message.author === "Jane Doe" ? ( // FIXME
      <SpeechBubbleGroup key={message.id} messages={message.messages} fromMe />
    ) : (
      <div key={message.id} className="flex gap-2 items-start">
        <Image
          className="w-6 aspect-square bg-slate-300 rounded-full"
          loader={loader}
          src={message.author}
          alt={message.author}
          width={24}
          height={24}
        />

        <SpeechBubbleGroup messages={message.messages} />
      </div>
    )
  );
}
