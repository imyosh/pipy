"use client";

import { Button } from "@/components/ui/button";
import GoogleIcon from "@/public/svg/google.svg";
import { signIn } from "next-auth/react";
import Loader from "./Loader";
import { useState } from "react";

export default function GoogleSigninButton() {
  const [loading, setLoading] = useState(false);

  const startSignIn = async () => {
    setLoading(true);
    await signIn("google", { callbackUrl: "/" });
    setLoading(false);
  };

  return (
    <Button
      disabled={loading}
      onClick={async () => startSignIn()}
      variant="outline"
      className="gap-4 h-12 px-5"
    >
      {loading ? (
        <Loader isLoading className="w-5" />
      ) : (
        <GoogleIcon className="w-5" />
      )}
      Sign In with google
    </Button>
  );
}
