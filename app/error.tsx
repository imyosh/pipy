"use client";

import { Button } from "@/components/ui/button";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="relative flex-grow">
      <div className="absolute -translate-x-1/2 -translate-y-1/2 space-y-4 w-full flex items-center justify-center flex-col top-1/2 left-1/2">
        <h2 className="text-destructive">
          {error.digest === "1664221770"
            ? "Check your internet connection!"
            : "Something went wrong!"}
        </h2>
        <Button
          variant={"secondary"}
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => {
              if (error.digest === "1664221770") return location.reload();
              reset();
            }
          }
        >
          {error.digest === "1664221770" ? "Reload" : "Try again"}
        </Button>
      </div>
    </main>
  );
}
