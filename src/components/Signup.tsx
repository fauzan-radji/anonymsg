import { FormEvent, FormEventHandler, useRef } from "react";

import InputForm from "./InputForm";

interface Props {
  setUsername: (username: string) => void;
}

export default function Signup({ setUsername }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!(inputRef.current && inputRef.current.value)) return;

    setUsername(inputRef.current.value);
  };

  return (
    <section className="px-4 flex items-center justify-center flex-1 flex-col gap-4">
      <h2 className="font-bold text-xl">Daftar</h2>
      <InputForm onSubmit={handleSubmit} ref={inputRef} actionButton="💾" />
    </section>
  );
}
