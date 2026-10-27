"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Popover } from "@base-ui/react/popover";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays } from "lucide-react";

const formSchema = z.object({
  eventName: z.string().trim().min(1, "Escribe el nombre del evento."),
  date: z.date("Selecciona una fecha para el evento."),
});

export default function FormDatePicker() {
  const [datePickerOpen, setDatePickerOpen] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventName: "",
      date: undefined,
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("Evento guardado", {
      description: `${data.eventName} · ${format(data.date, "PPP", { locale: es })}`,
      position: "bottom-right",
    });
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Programar un evento</CardTitle>
        <CardDescription>
          Indica el nombre y la fecha del evento.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="form-rhf-date-picker"
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup>
            <Controller
              name="eventName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-date-picker-event-name">
                    Nombre del evento
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-date-picker-event-name"
                    aria-invalid={fieldState.invalid}
                    aria-describedby={
                      fieldState.invalid
                        ? "form-rhf-date-picker-event-name-error"
                        : undefined
                    }
                    placeholder="Ej. Reunión de equipo"
                    autoComplete="off"
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError
                      id="form-rhf-date-picker-event-name-error"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />
            <Controller
              name="date"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-date-picker-date">
                    Fecha
                  </FieldLabel>
                  <Popover.Root
                    open={datePickerOpen}
                    onOpenChange={setDatePickerOpen}
                  >
                    <Popover.Trigger
                      render={
                        <Button
                          id="form-rhf-date-picker-date"
                          type="button"
                          variant="outline"
                          className="w-full justify-between font-normal"
                          aria-invalid={fieldState.invalid}
                          aria-describedby={
                            fieldState.invalid
                              ? "form-rhf-date-picker-date-error"
                              : undefined
                          }
                        />
                      }
                    >
                      <span>
                        {field.value
                          ? format(field.value, "PPP", { locale: es })
                          : "Selecciona una fecha"}
                      </span>
                      <CalendarDays aria-hidden="true" />
                    </Popover.Trigger>
                    <Popover.Portal>
                      <Popover.Positioner
                        side="bottom"
                        align="start"
                        sideOffset={4}
                      >
                        <Popover.Popup
                          data-slot="popover-content"
                          className="z-50 w-auto rounded-lg border bg-popover p-0 text-popover-foreground shadow-md outline-none"
                        >
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date);
                              setDatePickerOpen(false);
                            }}
                            locale={es}
                            autoFocus
                          />
                        </Popover.Popup>
                      </Popover.Positioner>
                    </Popover.Portal>
                  </Popover.Root>
                  {fieldState.invalid && (
                    <FieldError
                      id="form-rhf-date-picker-date-error"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="justify-end">
        <Button type="submit" form="form-rhf-date-picker">
          Guardar evento
        </Button>
      </CardFooter>
    </Card>
  );
}
