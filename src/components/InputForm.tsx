import { FormEventHandler, ForwardedRef, forwardRef } from "react";

interface Props {
  onSubmit: FormEventHandler<HTMLFormElement>;
  actionButton?: string;
}

function InputForm(
  { onSubmit, actionButton = "➤" }: Props,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <form
      onSubmit={onSubmit}
      className="container flex mx-auto bg-slate-300 rounded-full overflow-hidden outline-slate-50 outline-2 focus-within:outline -outline-offset-2"
    >
      <input
        ref={ref}
        type="text"
        placeholder="Ketik sesuatu ..."
        className="bg-transparent flex-1 min-w-0 placeholder:text-slate-900/50 outline-none px-4"
      />
      <button
        type="submit"
        className="bg-transparent w-12 aspect-square text-2xl flex items-center justify-center outline-none"
      >
        {actionButton}
      </button>
    </form>
  );
}

export default forwardRef<HTMLInputElement, Props>(InputForm);
