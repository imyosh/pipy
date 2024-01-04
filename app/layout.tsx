import type { Metadata } from "next";
import { Noto_Sans_Glagolitic } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import Nav from "@/components/Nav";

const inter = Noto_Sans_Glagolitic({
  subsets: ["cyrillic-ext"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Pipy",
  description: "Calculate your positions interests.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "sm:hidden flex flex-col px-4 pb-6 pt-2"
        )}
      >
        <Header />
        {children}
        <Nav />
        <Toaster />
      </body>

      <p className="sm:flex text-2xl text-foreground justify-center items-center bg-background h-full w-full hidden">
        Desktop Is Not Supported.
      </p>
    </html>
  );
}
