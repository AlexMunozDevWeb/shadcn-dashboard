import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";

import CalendarDemo from "./calendar-demo";

function CalendarFallback() {
  return (
    <div className="flex flex-wrap gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} className="h-64 w-72 rounded-lg border" />
      ))}
    </div>
  );
}

export default function CalendarPage() {
  return (
    <Suspense fallback={<CalendarFallback />}>
      <CalendarDemo />
    </Suspense>
  );
}
