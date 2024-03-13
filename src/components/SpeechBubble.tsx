import type { Message } from "@/types";
import strings from "@/values/strings";
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
  ...props
}: Props) {
  const replyMyself = fromMe && message.replied?.author === message.author;

  return (
    <div
      className={twJoin(
        "flex w-fit flex-col rounded-xl bg-slate-400 p-2 text-sm",
        first && "pt-1",
        fromMe
          ? ["items-end bg-slate-400", first && "rounded-tr-none"]
          : ["bg-slate-300", first && "rounded-tl-none"],
      )}
      {...props}
    >
      {first && (
        <p className="font-semibold text-slate-700">{message.author}</p>
      )}
      {message.replied && (
        <div className="my-1 w-full rounded bg-slate-300 px-1 py-0.5">
          <p className="text-xs font-semibold">
            {replyMyself ? strings.you : message.replied.author}
          </p>
          <p className="text-xs">{message.replied.text}</p>
        </div>
      )}
      <p>{message.text}</p>
    </div>
  );
}
