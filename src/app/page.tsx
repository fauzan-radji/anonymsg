import { Message } from "@/types";
import { SpeechBubbleRow } from "@/components";

const messagesMock: Message[] = [
  {
    from: "Jane Doe",
    text: "Ngampus?",
  },
  {
    from: "John Doe",
    text: "jam 2 jo",
  },
  {
    from: "Jane Doe",
    text: "Oke sip 👍",
  },
  {
    from: "John Doe",
    text: "Nanti b kabar kalo so otw",
  },
  {
    from: "John Doe",
    text: "Peh",
  },
  {
    from: "John Doe",
    text: "Jadi?",
  },
  {
    from: "Jane Doe",
    text: "Jadi",
  },
  {
    from: "Jane Doe",
    text: "15 menit lagi otw",
  },
  {
    from: "John Doe",
    text: "Langsung maso jo",
  },
  {
    from: "Jane Doe",
    text: "Otw",
  },
  {
    from: "John Doe",
    text: "Oke",
  },
  {
    from: "John Doe",
    text: "BAB bentar",
  },
  {
    from: "Jane Doe",
    text: "Impokan",
  },
  {
    from: "John Doe",
    text: "Impo apa?",
  },
  {
    from: "Jane Doe",
    text: "Tugas yang kemarin disuruh bikin apa?",
  },
];

export default function Home() {
  const messages: {
    from: string;
    text: string[];
  }[] = [];

  for (const message of messagesMock) {
    const lastMessage = messages.at(-1);
    if (lastMessage?.from === message.from) {
      lastMessage.text.push(message.text);
    } else {
      messages.push({
        from: message.from,
        text: [message.text],
      });
    }
  }

  return (
    <main className="bg-slate-200 flex flex-col h-svh text-slate-900">
      <header className="py-4 px-4 bg-slate-400">
        <div className="flex gap-4 container mx-auto items-center">
          <div className="w-10 aspect-square bg-slate-300 rounded-full"></div>
          <h1 className="font-bold text-xl">John Doe</h1>
        </div>
      </header>
      <section className="px-4 py-4 flex-1 overflow-scroll">
        <div className="container flex flex-col gap-2 mx-auto">
          <SpeechBubbleRow messages={messages} />
        </div>
      </section>
      <footer className="pt-2 pb-4 px-4">
        <form className="container flex mx-auto bg-slate-300 rounded-full overflow-hidden outline-slate-50 outline-2 focus-within:outline -outline-offset-2">
          <input
            type="text"
            placeholder="Ketik sesuatu ..."
            className="bg-transparent flex-1 min-w-0 placeholder:text-slate-900/50 outline-none px-4"
          />
          <button className="bg-transparent w-12 aspect-square text-2xl flex items-center justify-center outline-none">
            ➤
          </button>
        </form>
      </footer>
    </main>
  );
}
