import { twJoin, twMerge } from "tailwind-merge";

import Image from "next/image";

interface Props {
  username: string;
  size: "small" | "medium" | "large";
  className?: string;
}

const loader = ({ src }: { src: string }) => `/avatar/${src}`;

export default function Avatar({ username, size, className = "" }: Props) {
  return username.length > 0 ? (
    <Image
      className={twMerge(
        "aspect-square overflow-hidden rounded-full bg-slate-300",
        size === "small" && "h-6 w-6",
        size === "medium" && "h-10 w-10",
        size === "large" && "h-12 w-12",
        className,
      )}
      src={username}
      loader={loader}
      alt={username}
      width={24}
      height={24}
    />
  ) : (
    <div
      className={twMerge(
        "aspect-square rounded-full bg-slate-300",
        size === "small" && "h-6 w-6",
        size === "medium" && "h-10 w-10",
        size === "large" && "h-12 w-12",
        className,
      )}
    ></div>
  );
}
