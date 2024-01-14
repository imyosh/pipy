"use client";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  // AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import MenuIcon from "@/public/svg/bars.svg";
import { useState, useTransition } from "react";
import Loader from "./Loader";
import { signOut } from "next-auth/react";

import SignoutIcon from "@/public/svg/signout.svg";
import ExchangeIcon from "@/public/svg/exchange.svg";

import { apiTransferPercentage } from "@/lib/api";

export default function HeaderMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutAlertOpen, setLogoutAlertOpen] = useState(false);
  const [transferAlertOpen, setTransferAlertOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function logout() {
    startTransition(async () => {
      await signOut();
    });
  }

  function transferPercentage() {
    startTransition(async () => {
      await apiTransferPercentage();
      setTransferAlertOpen(false);
    });
  }

  return (
    <div className="flex flex-col items-center">
      <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="placer">
            <MenuIcon className="hover:fill-primary-2 w-8 h-8 fill-secondary-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          hidden={logoutAlertOpen}
          side="bottom"
          className="ml-4"
        >
          <DropdownMenuItem
            onSelect={() => setLogoutAlertOpen(true)}
            className="group group flex w-full items-center gap-2"
          >
            <SignoutIcon className="h-4 w-4 fill-[#90929D] transition group-hover:fill-[#fff]" />
            Logout
          </DropdownMenuItem>

          <DropdownMenuItem
            onSelect={() => setTransferAlertOpen(true)}
            className="group group flex w-full items-center gap-2"
          >
            <ExchangeIcon className="h-4 w-4 fill-[#90929D] transition group-hover:fill-[#fff]" />
            Transfer percentage
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog
        open={logoutAlertOpen}
        onOpenChange={(isOpen) => {
          if (isPending) return;
          setLogoutAlertOpen(isOpen);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Log out form your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

            <Button
              disabled={isPending}
              onClick={() => {
                logout();
              }}
              variant="destructive"
            >
              Logout
              <Loader isLoading={isPending} />
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={transferAlertOpen}
        onOpenChange={(isOpen) => {
          if (isPending) return;
          setTransferAlertOpen(isOpen);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will Transfer{" "}
              <span className="text-green-400">20%</span> to your balance from
              the invistor!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <Button
              disabled={isPending}
              onClick={() => {
                transferPercentage();
              }}
            >
              Transfer
              <Loader isLoading={isPending} />
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
