"use client";

import { toast } from "sonner";

import { Button } from "@/modules/components//ui/button";

export default function SonnerDemo() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", {
            duration: 1000,
            description: `Fecha: ${new Date()}`,
            action: {
              label: "Undo",
              onClick: () => toast.info("Action reverted."),
            },
          })
        }
      >
        Show Toast
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.success("Event has been created", {
            className: "bg-green-500 text-white",
            duration: 1000,
            description: `Fecha: ${new Date()}`,
            action: {
              label: "Undo",
              onClick: () => toast.info("Action reverted."),
            },
          })
        }
      >
        Show Custom Colors
      </Button>
    </div>
  );
}
