import { SpeechBubbleGroup } from ".";

export default function SpeechBubbleRow({
  messages,
}: {
  messages: {
    from: string;
    text: string[];
  }[];
}) {
  return messages.map((message, i) =>
    message.from === "Jane Doe" ? (
      <SpeechBubbleGroup key={i} messages={message.text} fromMe />
    ) : (
      <div key={i} className="flex gap-2 items-start">
        <div className="w-6 aspect-square bg-slate-300 rounded-full"></div>

        <SpeechBubbleGroup messages={message.text} />
      </div>
    )
  );
}
