import Image from "next/image";

interface Props {
  username: string;
}

export default function Avatar({ username }: Props) {
  return (
    <Image
      className="w-6 aspect-square bg-slate-300 rounded-full overflow-hidden"
      src={`/avatar/${username}`}
      alt={username}
      width={24}
      height={24}
    />
  );
}
