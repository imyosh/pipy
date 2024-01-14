import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useEffect, useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Loader from "./Loader";
import { Input } from "./ui/input";
import { apiResetInvistorBalance, apiTransferPercentage } from "@/lib/api";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "./ui/alert-dialog";
import { Portfolio } from "@/types";

const FormSchema = z.object({
  value: z.coerce.number(),
});

type TransferPercentageDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  portfolio: Portfolio;
};

export default function TransferPercentageDialog({
  open,
  setOpen,
  portfolio,
}: TransferPercentageDialogProps) {
  const [isPending, startTransition] = useTransition();

  const isInLoss =
    portfolio.invistor < (portfolio.recentInvistorBaseBalance ?? 0);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      //   value: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      await apiTransferPercentage(data.value);
      setOpen(false);
    });
  }

  function resetBaseBalance() {
    startTransition(async () => {
      await apiResetInvistorBalance();
      setOpen(false);
    });
  }

  useEffect(() => {
    if (open && form)
      form.setValue(
        "value",
        Number(portfolio.recentInvistorBaseBalance?.toFixed(2))
      );
  }, [portfolio, form, open]);

  return (
    <AlertDialog
      open={open}
      onOpenChange={(isOpen) => {
        if (isPending) return;
        setOpen(isOpen);
      }}
    >
      <AlertDialogContent
        className="gap-6"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="w-max">Are you sure? </AlertDialogTitle>
          <AlertDialogDescription className="text-start">
            This action cannot be undone. This will Transfer{" "}
            <span className="text-green-400">20%</span> to your balance from the
            invistor!
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="value"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      max={Number(portfolio.invistor.toFixed(2)) - 0.01}
                      type="number"
                      placeholder="base balance"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <AlertDialogFooter>
              <AlertDialogCancel type="button" disabled={isPending}>
                Cancel
              </AlertDialogCancel>

              {isInLoss && (
                <Button
                  variant="outline"
                  onClick={() => resetBaseBalance()}
                  className="mt-2"
                >
                  Reset base balance
                  <Loader isLoading={isPending} />
                </Button>
              )}
              <Button disabled={isPending || isInLoss} type="submit">
                Transfer
                {!isInLoss && <Loader isLoading={isPending} />}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
