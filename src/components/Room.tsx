import Avatar from "./Avatar";
import Link from "next/link";
import routes from "@/values/routes";

interface Props {
  id: string;
  name: string;
  preview: string;
}

export default function Room({ id, name, preview }: Props) {
  return (
    <Link
      href={routes.room(id)}
      className="flex items-center gap-2 px-4 py-2 hover:bg-slate-300"
    >
      <Avatar username={id} size="large" className="flex-shrink-0" />
      <div className="flex select-none flex-col py-2">
        <h6 className="text-sm font-semibold">{name}</h6>
        <p className="line-clamp-1 text-xs">{preview}</p>
      </div>
    </Link>
  );
}
