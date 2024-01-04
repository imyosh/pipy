import Image from "next/image";

import UserIcon from "@/public/svg/user.svg";
import HeaderMenu from "./HeaderMenu";
import { getUserSession } from "@/lib/session";

export default async function Header() {
  const session = await getUserSession();

  if (!session) return null;

  return (
    <div className="flex mb-4 items-center justify-between">
      <HeaderMenu />

      <h1 className="tracking-[5px]">PIPY</h1>
      {session?.image ? (
        <Image
          className="w-9 h-9 rounded-full"
          width={32}
          height={32}
          src={session.image}
          alt="avatar"
        />
      ) : (
        <div className="w-9 h-9 flex items-center border-white justify-center rounded-full border">
          <UserIcon className="w-6 h-6 fill-white" />
        </div>
      )}
    </div>
  );
}
