"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

export default function ToastDemo() {
  function showToast() {
    toast.add({
      title: "Event created",
      description: "Sunday, December 3 at 9:00 AM",
    });
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      <Button variant="outline" onClick={showToast}>
        Show Toast
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.add({ description: "Event has been created." })}
      >
        Default
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            type: "success",
            description: "Event has been created.",
          })
        }
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            type: "info",
            description: "Arrive 10 minutes before the event.",
          })
        }
      >
        Info
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            type: "warning",
            description: "The event cannot start before 8:00 AM.",
          })
        }
      >
        Warning
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            type: "error",
            description: "The event could not be created.",
            priority: "high",
          })
        }
      >
        Error
      </Button>
    </div>
  );
}
