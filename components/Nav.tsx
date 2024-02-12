"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

import AddIcon from "@/public/svg/add.svg";
import DashboardIcon from "@/public/svg/dashboard.svg";
import ListIcon from "@/public/svg/list.svg";
import CalculatorIcon from "@/public/svg/calculator.svg";
import AddPositionSheet from "@/components/AddPositionSheet";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathName = usePathname();

  if (pathName === "/login") return null;

  return (
    <nav className="mt-4 flex items-center gap-8 justify-center">
      <Link href="/" className="group cursor-pointer">
        <DashboardIcon
          data-active={pathName === "/"}
          className="size-6 fill-[#737373] data-[active=true]:fill-primary"
        />
      </Link>
      <Link href="/positions" className="group cursor-pointer">
        <ListIcon
          data-active={pathName === "/positions"}
          className="size-5 stroke-[#737373]  data-[active=true]:stroke-primary"
        />
      </Link>
      <AddPositionSheet>
        <Button className="group h-12 w-12 rounded-md border border-dashed border-secondary-foreground bg-transparent p-0 hover:border-primary hover:bg-transparent active:bg-transparent">
          <AddIcon className="h-6 w-6 fill-secondary-foreground transition group-hover:fill-primary" />
        </Button>
      </AddPositionSheet>
      <Link href="/positions" className="group cursor-pointer">
        <ListIcon
          data-active={pathName === "/positions"}
          className="size-5 stroke-[#737373]  data-[active=true]:stroke-primary"
        />
      </Link>
      <Link href="/calc" className="group cursor-pointer">
        <CalculatorIcon
          data-active={pathName === "/calc"}
          className="size-[1.3rem] fill-[#737373]  data-[active=true]:fill-primary"
        />
      </Link>
    </nav>
  );
}
