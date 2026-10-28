"use client";

import { useState } from "react";
import { es } from "date-fns/locale";
import { Calendar } from "@/modules/components//ui/calendar";

export default function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [multipleDates, setMultipleDates] = useState<Date[] | undefined>([
    new Date(),
  ]);

  const smallDate = date?.toLocaleString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="flex-co sm:flex sm:flex-wrap gap-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-lg border"
        captionLayout="dropdown"
        locale={es}
        disabled={(date) => date.getDay() === 0 || date.getDay() === 6}
      />
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-lg border"
        captionLayout="dropdown"
        locale={es}
        disabled={(date) => date > new Date()}
      />
      <Calendar
        mode="multiple"
        selected={multipleDates}
        onSelect={setMultipleDates}
        className="rounded-lg border"
        captionLayout="dropdown"
        locale={es}
      />

      <div>
        <h1 className="text-3xl">Information</h1>
        <div className="border-b"></div>
        <p>{smallDate}</p>
        <p>
          {multipleDates?.map((date) => date.toLocaleDateString()).join(", ")}
        </p>
      </div>
    </div>
  );
}
