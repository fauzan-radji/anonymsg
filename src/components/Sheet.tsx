import { twJoin } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

export default function Sheet({ children, isOpen, setOpen }: Props) {
  return (
    <div
      className={twJoin(
        "fixed bottom-0 left-0 right-0 top-0 flex flex-col transition md:flex-row",
        isOpen ? "bg-slate-950/50 backdrop-blur" : "pointer-events-none",
      )}
    >
      <div className="flex-auto" onClick={() => setOpen(false)}></div>
      <div
        className={twJoin(
          "relative rounded-t-2xl bg-slate-300 transition-transform md:rounded-l-2xl md:rounded-r-none",
          !isOpen && "translate-y-full md:translate-x-full md:translate-y-0",
        )}
      >
        <button
          className="absolute right-0 top-0 block px-4 py-2 text-2xl"
          onClick={() => setOpen(false)}
        >
          &times;
        </button>
        <div className="container mx-auto flex flex-col items-center gap-2 px-4 py-8 md:px-8 md:py-16">
          {children}
        </div>
      </div>
    </div>
  );
}
