import { FormEventHandler, ForwardedRef, forwardRef, useState } from "react";

import strings from "@/values/strings";
import { twMerge } from "tailwind-merge";

interface Props {
  onSubmit: FormEventHandler<HTMLFormElement>;
  actionButton?: string;
  validate?: (value: string) => boolean;
}

function InputForm(
  { onSubmit, actionButton = "➤", validate = () => true }: Props,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const [isValid, setIsValid] = useState(() => validate(""));
  const [isEmpty, setIsEmpty] = useState(true);

  return (
    <form
      onSubmit={(formEvent) => {
        formEvent.preventDefault();
        if (!isValid) return;
        onSubmit(formEvent);
      }}
      className={twMerge(
        "container mx-auto flex overflow-hidden rounded-full bg-slate-300 outline-2 -outline-offset-2 outline-slate-50 focus-within:outline",
        !isValid && !isEmpty && "outline-red-500",
      )}
    >
      <input
        ref={ref}
        type="text"
        placeholder={strings.type_something}
        className="min-w-0 flex-1 bg-transparent px-4 outline-none placeholder:text-slate-900/50"
        onChange={(e) => {
          setIsEmpty(e.target.value === "");
          setIsValid(validate(e.target.value));
        }}
      />
      <button
        type="submit"
        className="flex aspect-square w-12 items-center justify-center bg-transparent text-2xl outline-none"
      >
        {actionButton}
      </button>
    </form>
  );
}

export default forwardRef<HTMLInputElement, Props>(InputForm);
