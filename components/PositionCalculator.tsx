"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

const FormSchema = z.object({
  percentage: z.coerce.number().min(1).max(100),
  pips: z.coerce.number().min(1),
});

export default function PositionCalculator({ capital }: { capital: number }) {
  const [result, setResult] = useState<number>();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      percentage: 2,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setResult((capital * (data.percentage / 100)) / (data.pips * 10));
    form.reset(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-1">
        <Input
          value={capital.toFixed(1)}
          readOnly
          type="number"
          placeholder="Percentage %"
        />

        <FormField
          control={form.control}
          name="percentage"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="number" placeholder="Percentage %" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pips"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="number" placeholder="Pips" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-4">
          <Separator className="mb-4" />
          <Label>Result</Label>
          {result ? (
            <p>
              <span className="text-2xl">{result.toFixed(2)}</span>{" "}
              <span className="text-green-200">lot</span>
            </p>
          ) : (
            <span className="text-2xl">--</span>
          )}
          <Separator className="mt-4" />
        </div>

        <Button
          disabled={!form.formState.isDirty}
          type="submit"
          className="h-10 w-full font-bold"
        >
          Calculator
        </Button>
      </form>
    </Form>
  );
}
