export default function SpeechBubble({
  children,
  fromMe = false,
}: {
  children: React.ReactNode;
  fromMe?: boolean;
}) {
  return fromMe ? (
    <p className="px-4 py-2 md:px-4 md:py-2 w-fit text-sm bg-slate-400 rounded-xl rounded-br-none">
      {children}
    </p>
  ) : (
    <p className="px-4 py-2 md:px-4 md:py-2 w-fit text-sm bg-slate-300 rounded-xl rounded-tl-none">
      {children}
    </p>
  );
}
