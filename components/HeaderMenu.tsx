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

export default function HeaderMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutAlertOpen, setLogoutAlertOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function logout() {
    startTransition(async () => {
      await signOut();
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
        <DropdownMenuContent hidden={logoutAlertOpen}>
          <DropdownMenuItem
            onSelect={() => setLogoutAlertOpen(true)}
            className="group group flex w-full items-center gap-2"
          >
            <SignoutIcon className="h-4 w-4 fill-[#90929D] transition group-hover:fill-[#fff]" />
            Logout
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
            <AlertDialogCancel>Cancel</AlertDialogCancel>
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
    </div>
  );
}
