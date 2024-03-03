import { SpeechBubble } from ".";

export default function SpeechBubbleGroup({
  messages,
  fromMe = false,
}: {
  messages: string[];
  fromMe?: boolean;
}) {
  return fromMe ? (
    <div className="flex flex-col gap-1 items-end max-w-[calc(100%_-_2rem)] md:max-w-prose ms-auto">
      {messages.map((message) => (
        <SpeechBubble
          fromMe
          key={message.replace(/\W/g, "_").toLocaleLowerCase()}
        >
          {message}
        </SpeechBubble>
      ))}
    </div>
  ) : (
    <div className="flex flex-col gap-1 flex-1 md:max-w-prose">
      {messages.map((message) => (
        <SpeechBubble key={message.replace(/\W/g, "_").toLocaleLowerCase()}>
          {message}
        </SpeechBubble>
      ))}
    </div>
  );
}
