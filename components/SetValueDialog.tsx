import { useEffect, useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ValueShareType } from "@/types";
import { apiUpdateUserPortfolio } from "@/lib/api";
import Loader from "./Loader";
import { useToast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  value: z.coerce.number(),
});

type SetValueDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  target: ValueShareType;
};

export default function SetValueDialog({
  open,
  setOpen,
  target,
}: SetValueDialogProps) {
  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      value: Number(target.value.toFixed(2)),
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      try {
        await apiUpdateUserPortfolio(target.handler, data.value);
      } catch (err) {
        console.log(err);
        toast({
          title: "Error",
          description: "Something went wrong!",
          variant: "destructive",
        });
      }
      setOpen(false);
    });
  }

  useEffect(() => {
    if (open && form) form.setValue("value", Number(target.value.toFixed(2)));
  }, [target, form, open]);

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (isPending) return;
        setOpen(isOpen);
      }}
    >
      <DialogContent
        className="gap-6"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="w-max">
            Update {target.title === "mine" ? "My" : "Invistor"} Value
          </DialogTitle>
          <DialogDescription className="w-max">
            Update or asign a new value directly.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* <span tabIndex={0} /> */}
            <FormField
              control={form.control}
              name="value"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      className="m-auto h-16 w-2/3 text-center text-3xl"
                      placeholder="value"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-center gap-4">
              <Button
                disabled={isPending}
                onClick={() =>
                  form.setValue(
                    "value",
                    Number(Number(form.getValues("value") - 10).toFixed(2))
                  )
                }
                variant="secondary"
                type="button"
                className="h-10 w-10 text-red-400"
              >
                -10
              </Button>
              <Button
                disabled={isPending}
                onClick={() =>
                  form.setValue(
                    "value",
                    Number(Number(form.getValues("value") - 20).toFixed(2))
                  )
                }
                variant="secondary"
                type="button"
                className="mr-2 h-10 w-10 text-red-400"
              >
                -20
              </Button>

              <Button
                disabled={isPending}
                onClick={() =>
                  form.setValue(
                    "value",
                    Number(Number(form.getValues("value") + 10).toFixed(2))
                  )
                }
                variant="secondary"
                type="button"
                className="ml-2 h-10 w-10 text-green-400"
              >
                +10
              </Button>
              <Button
                disabled={isPending}
                onClick={() =>
                  form.setValue(
                    "value",
                    Number(Number(form.getValues("value") + 20).toFixed(2))
                  )
                }
                variant="secondary"
                type="button"
                className="h-10 w-10 text-green-400"
              >
                +20
              </Button>
            </div>
            <Button
              disabled={isPending}
              type="submit"
              className="h-10 w-full font-bold"
            >
              CONFIRM
              <Loader isLoading={isPending} />
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
