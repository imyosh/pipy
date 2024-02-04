"use client";

import { useState, useTransition } from "react";

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

import OptionsIcon from "@/public/svg/options.svg";
import DeleteIcon from "@/public/svg/delete.svg";
import EditIcon from "@/public/svg/edit.svg";
import SetValueDialog from "./SetValueDialog";
import Loader from "./Loader";
import { apiUpdateUserPortfolio } from "@/lib/api";
import { ValueShareType } from "@/types";
import { useToast } from "./ui/use-toast";
import TransferPercentageDialog from "./TransferPercentageDialog";
import ExchangeIcon from "@/public/svg/exchange.svg";

export default function ValueShareOptions({
  target,
}: {
  target: ValueShareType;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [clearAlertOpen, setClearAlertOpen] = useState(false);
  const [changeDialogOpen, setChangeDialogOpen] = useState(false);
  const [transferAlertOpen, setTransferAlertOpen] = useState(false);

  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  function clearValue() {
    startTransition(async () => {
      try {
        await apiUpdateUserPortfolio(target.handler, 0);
      } catch (err) {
        console.log(err);
        toast({
          title: "Error",
          description: "Something went wrong!",
          variant: "destructive",
        });
      }

      setClearAlertOpen(false);
    });
  }

  return (
    <>
      <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="placer" className="absolute right-3 top-1">
            <OptionsIcon className="hover:fill-primary-2 fill-secondary-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent hidden={clearAlertOpen}>
          <DropdownMenuItem
            onSelect={() => setChangeDialogOpen(true)}
            className="group group flex w-full items-center gap-2"
          >
            <EditIcon className="h-4 w-4 fill-[#90929D] transition group-hover:fill-[#fff]" />
            Change
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => setClearAlertOpen(true)}
            className="group group flex w-full items-center gap-2"
          >
            <DeleteIcon className="h-4 w-4 fill-[#90929D] transition group-hover:fill-[#fff]" />
            Clear
          </DropdownMenuItem>

          {target.handler !== "mine" && (
            <DropdownMenuItem
              disabled={!target.value || target.value < 0.01}
              onSelect={() => setTransferAlertOpen(true)}
              className="group group flex w-full items-center gap-2"
            >
              <ExchangeIcon className="h-4 w-4 fill-[#90929D] transition group-hover:fill-[#fff]" />
              Transfer percentage
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog
        open={clearAlertOpen}
        onOpenChange={(isOpen) => {
          if (isPending) return;
          setClearAlertOpen(isOpen);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently clear this
              value.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                disabled={isPending}
                onClick={() => {
                  clearValue();
                }}
                variant="destructive"
              >
                Clear
                <Loader isLoading={isPending} />
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <SetValueDialog
        open={changeDialogOpen}
        setOpen={setChangeDialogOpen}
        target={target}
      />

      <TransferPercentageDialog
        open={transferAlertOpen}
        setOpen={setTransferAlertOpen}
        target={target}
      />
    </>
  );
}
