"use client";

import { Button } from "@/components/ui/button";
import GoogleIcon from "@/public/svg/google.svg";
import { signIn } from "next-auth/react";

export default function GoogleSigninButton() {
  return (
    <Button
      onClick={() => signIn("google", { callbackUrl: "/" })}
      variant="outline"
      className="gap-2"
    >
      <GoogleIcon className="w-4" />
      Sign In with google
    </Button>
  );
}
