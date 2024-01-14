"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { ReactNode, useState, useTransition } from "react";
import Loader from "./Loader";
import { apiDeletePosition } from "@/lib/api";
import { IdPosition } from "@/types";
import UpTrendIcon from "@/public/svg/up-trend.svg";
import DownTrendIcon from "@/public/svg/down-trend.svg";

export default function DeletePositionAlertDialog({
  children,
  position,
}: {
  children: ReactNode;
  position: IdPosition;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function deletePosition() {
    startTransition(async () => {
      await apiDeletePosition(position);
      setOpen(false);
    });
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(isOpen) => {
        if (isPending) return;
        setOpen(isOpen);
      }}
    >
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently Delete this
            position!
          </AlertDialogDescription>
          <div className="flex flex-1 py-2 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 place-content-center rounded-lg bg-secondary">
                {position.value > 0 ? (
                  <UpTrendIcon className="h-7 w-7 fill-green-400" />
                ) : (
                  <DownTrendIcon className="h-7 w-7 fill-red-400" />
                )}
              </div>
              <div className="space-2">
                <p>
                  {position.currencyPair === "" ? (
                    <span className="text-gray-500">--</span>
                  ) : (
                    position.currencyPair
                  )}
                </p>
                <p className="text-secondary-foreground">
                  {position.lot === 0 ? (
                    <span className="text-gray-500">--</span>
                  ) : (
                    position.lot
                  )}
                </p>
              </div>
            </div>
            <p
              data-ispositive={position.value > 0}
              className="text-green-400 data-[ispositive=false]:text-red-400"
            >
              ${Math.abs(position.value)}
            </p>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <Button
            disabled={isPending}
            onClick={() => {
              deletePosition();
            }}
            variant="destructive"
          >
            Delete
            <Loader isLoading={isPending} />
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
