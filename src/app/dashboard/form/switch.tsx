"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/modules/components//ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/modules/components//ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/modules/components//ui/field";
import { Switch } from "@/modules/components//ui/switch";
import { uiText } from "@/modules/data/ui-text";

const formSchema = z.object({
  twoFactor: z.boolean().refine((val) => val === true, {
    message: uiText.demo.form.recommendedTwoFactor,
  }),
});

export default function FormRhfSwitch() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      twoFactor: false,
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast(uiText.demo.form.submittedValues, {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    });
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>{uiText.demo.form.security}</CardTitle>
        <CardDescription>
          {uiText.demo.form.securityDescription}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-switch" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="twoFactor"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  orientation="horizontal"
                  data-invalid={fieldState.invalid}
                >
                  <FieldContent>
                    <FieldLabel htmlFor="form-rhf-switch-twoFactor">
                      {uiText.demo.form.multiFactor}
                    </FieldLabel>
                    <FieldDescription>
                      {uiText.demo.form.multiFactorDescription}
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                  <Switch
                    id="form-rhf-switch-twoFactor"
                    name={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                  />
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            {uiText.demo.form.reset}
          </Button>
          <Button type="submit" form="form-rhf-switch">
            {uiText.demo.form.save}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
