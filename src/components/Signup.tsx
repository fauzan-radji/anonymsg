import { FormEventHandler, useRef } from "react";

import InputForm from "./InputForm";
import strings from "@/values/strings";

interface Props {
  setUsername: (username: string) => void;
}

export default function Signup({ setUsername }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async () => {
    if (!(inputRef.current && inputRef.current.value)) return;

    setUsername(inputRef.current.value);
  };

  const validateUsername = (username: string) => /^[a-z0-9_.]+$/.test(username);

  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-2 px-4">
      <h2 className="text-xl font-bold">{strings.pick_a_username}</h2>
      <InputForm
        validate={validateUsername}
        onSubmit={handleSubmit}
        ref={inputRef}
        actionButton="💾"
      />
      <p className="text-center text-xs">{strings.username_can_only_contain}</p>
    </section>
  );
}
