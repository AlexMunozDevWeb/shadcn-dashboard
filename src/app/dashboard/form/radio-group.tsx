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
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/modules/components//ui/field";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/modules/components//ui/radio-group";
import { uiText } from "@/modules/data/ui-text";

const plans = [
  {
    id: "starter",
    title: uiText.demo.form.starter,
    description: uiText.demo.form.starterDescription,
  },
  {
    id: "pro",
    title: uiText.demo.form.pro,
    description: uiText.demo.form.proDescription,
  },
  {
    id: "enterprise",
    title: uiText.demo.form.enterprise,
    description: uiText.demo.form.enterpriseDescription,
  },
] as const;

const formSchema = z.object({
  plan: z.string().min(1, uiText.demo.form.planRequired),
});

export default function FormRhfRadioGroup() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plan: "",
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
        <CardTitle>{uiText.demo.form.subscriptionTitle}</CardTitle>
        <CardDescription>
          {uiText.demo.form.subscriptionDescription}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-radiogroup" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="plan"
              control={form.control}
              render={({ field, fieldState }) => (
                <FieldSet data-invalid={fieldState.invalid}>
                  <FieldLegend>{uiText.demo.form.plan}</FieldLegend>
                  <FieldDescription>
                    {uiText.demo.form.planDescription}
                  </FieldDescription>
                  <RadioGroup
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                  >
                    {plans.map((plan) => (
                      <FieldLabel
                        key={plan.id}
                        htmlFor={`form-rhf-radiogroup-${plan.id}`}
                      >
                        <Field
                          orientation="horizontal"
                          data-invalid={fieldState.invalid}
                        >
                          <FieldContent>
                            <FieldTitle>{plan.title}</FieldTitle>
                            <FieldDescription>
                              {plan.description}
                            </FieldDescription>
                          </FieldContent>
                          <RadioGroupItem
                            value={plan.id}
                            id={`form-rhf-radiogroup-${plan.id}`}
                            aria-invalid={fieldState.invalid}
                          />
                        </Field>
                      </FieldLabel>
                    ))}
                  </RadioGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldSet>
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
          <Button type="submit" form="form-rhf-radiogroup">
            {uiText.demo.form.save}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
