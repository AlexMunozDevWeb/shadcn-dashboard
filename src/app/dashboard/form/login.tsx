"use client";

import { Button } from "@/modules/components//ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/modules/components//ui/field";
import { Input } from "@/modules/components//ui/input";
import { Card, CardContent } from "@/modules/components//ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { uiText } from "@/modules/data/ui-text";

const formSchema = z.object({
  username: z.string().trim().min(1, uiText.demo.form.usernameRequired),
  email: z
    .string()
    .trim()
    .min(1, uiText.demo.form.emailRequired)
    .email(uiText.demo.form.emailInvalid),
});

export default function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast.success(uiText.demo.form.submitted, {
      description: `${uiText.demo.form.welcome}, ${data.username}.`,
    });
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardContent>
        <form
          id="form-rhf-demo"
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup>
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    {uiText.demo.form.username}
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    aria-describedby={
                      fieldState.invalid
                        ? "form-rhf-demo-title-error"
                        : undefined
                    }
                    placeholder={uiText.demo.form.usernamePlaceholder}
                    autoComplete="off"
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError
                      id="form-rhf-demo-title-error"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-email">
                    {uiText.demo.form.email}
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-email"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    aria-describedby={
                      fieldState.invalid
                        ? "form-rhf-demo-email-error"
                        : undefined
                    }
                    placeholder={uiText.demo.form.emailPlaceholder}
                    autoComplete="off"
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError
                      id="form-rhf-demo-email-error"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
        <Button type="submit" form="form-rhf-demo" className="mt-4">
          {uiText.demo.form.submit}
        </Button>
      </CardContent>
    </Card>
  );
}
