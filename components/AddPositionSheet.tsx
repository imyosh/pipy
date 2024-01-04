import { ReactNode, useEffect, useState, useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import Loader from "./Loader";
import { apiAddNewPosition } from "@/lib/api";
import { useToast } from "./ui/use-toast";

const FOREXPAIRS = [
  "GOLD",
  "EUR/USD",
  "USD/JPY",
  "GBP/USD",
  "USD/CHF",
  "AUD/USD",
  "USD/CAD",
  "NZD/USD",
];

const FormSchema = z.object({
  value: z.coerce.number().min(0.1).default(0),
  currencyPair: z.string().optional().default(""),
  lot: z.coerce
    .number()
    .default(0)
    .refine((value) => {
      if (value && value < 0.01) return false;
      return true;
    }),
});

export default function AddPositionSheet({
  children,
}: {
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [positionType, setPositionType] = useState("Profit");

  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      currencyPair: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const parrsedData = {
      ...data,
      value: positionType === "Loss" ? -data.value : data.value,
    };
    startTransition(async () => {
      try {
        await apiAddNewPosition(parrsedData);
      } catch (err) {
        console.log(err);
        toast({
          title: "Error",
          description: "Something went wrong!",
          variant: "destructive",
        });
      }
      setOpen(false);
      form.reset();
    });
  }

  useEffect(() => {
    if (open) setPositionType("Profit");
  }, [open]);

  return (
    <Sheet
      open={open}
      onOpenChange={(isOpen) => {
        if (isPending) return;
        setOpen(isOpen);
      }}
    >
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="bottom">
        <Tabs
          defaultValue="Profit"
          onValueChange={setPositionType}
          className="flex flex-col"
        >
          <TabsList className="w-3/4 m-auto mb-4">
            <TabsTrigger
              className="flex-grow data-[state=active]:text-green-500 text-bold"
              value="Profit"
            >
              Profit
            </TabsTrigger>
            <TabsTrigger
              className="flex-grow data-[state=active]:text-red-500 text-bold"
              value="Loss"
            >
              Loss
            </TabsTrigger>
          </TabsList>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <SheetTitle>Add New Position</SheetTitle>

              <FormField
                control={form.control}
                name="value"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={positionType}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currencyPair"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem className="flex space-y-0">
                    <FormControl>
                      <Input
                        className="rounded-r-none"
                        placeholder="Currency Pair ( optional )"
                        {...field}
                      />
                    </FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-12 rounded-l-none"></SelectTrigger>
                      <SelectContent>
                        {FOREXPAIRS.map((pair) => (
                          <SelectItem key={pair} value={pair}>
                            {pair}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lot"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Lot ( optional )"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                disabled={isPending}
                type="submit"
                className="h-10 w-full font-bold"
              >
                ADD
                <Loader isLoading={isPending} />
              </Button>
            </form>
          </Form>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
