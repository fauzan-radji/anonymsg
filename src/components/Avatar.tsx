import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface Props {
  username: string;
  size: "small" | "medium" | "large" | "x-large" | "gigantic";
  className?: string;
}

const loader = ({ src }: { src: string }) => `/avatar/${src}`;

const sizes: Record<Props["size"], string> = {
  small: "h-6 w-6",
  medium: "h-10 w-10",
  large: "h-12 w-12",
  "x-large": "h-16 w-16",
  gigantic: "h-24 w-24",
};

export default function Avatar({ username, size, className = "" }: Props) {
  return username.length > 0 ? (
    <Image
      className={twMerge(
        "aspect-square overflow-hidden rounded-full bg-slate-300",
        sizes[size],
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
        sizes[size],
        className,
      )}
    ></div>
  );
}
