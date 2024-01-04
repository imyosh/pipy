import GoogleSigninButton from "@/components/GoogleSigninButton";
import { getUserSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getUserSession();

  if (session) redirect("/");

  return (
    <main className="flex flex-grow justify-center items-center flex-col gap-6">
      <h1 className="text-xl border tracking-[1px] p-4 rounded-full w-20 h-20 flex items-center justify-center">
        PIPY
      </h1>
      <p className="text-secondary-foreground text-center mb-8">
        All in one investors management tool for forex trading.
      </p>
      <GoogleSigninButton />
    </main>
  );
}
