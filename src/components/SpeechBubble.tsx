import type { Message } from "@/types";
import { twJoin } from "tailwind-merge";

interface Props {
  message: Message;
  fromMe?: boolean;
  first?: boolean;
}

export default function SpeechBubble({
  message,
  fromMe = false,
  first = false,
}: Props) {
  return (
    <div
      className={twJoin(
        "flex w-fit flex-col rounded-xl bg-slate-400 p-2 text-sm",
        first && "pt-1",
        fromMe
          ? ["items-end bg-slate-400", first && "rounded-tr-none"]
          : ["bg-slate-300", first && "rounded-tl-none"],
      )}
    >
      {first && (
        <p className="font-semibold text-slate-700">{message.author}</p>
      )}
      <p>{message.text}</p>
    </div>
  );
}
