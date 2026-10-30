"use client";

import { toast } from "sonner";

import { Button } from "@/modules/components//ui/button";
import { uiText } from "@/modules/data/ui-text";

export default function SonnerDemo() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <Button
        variant="outline"
        onClick={() =>
          toast(uiText.demo.toast.created, {
            duration: 1000,
            description: `Fecha: ${new Date()}`,
            action: {
              label: uiText.demo.sonner.undo,
              onClick: () => toast.info(uiText.demo.sonner.reverted),
            },
          })
        }
      >
        {uiText.demo.toast.show}
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.success(uiText.demo.toast.created, {
            className: "bg-green-500 text-white",
            duration: 1000,
            description: `Fecha: ${new Date()}`,
            action: {
              label: uiText.demo.sonner.undo,
              onClick: () => toast.info(uiText.demo.sonner.reverted),
            },
          })
        }
      >
        {uiText.demo.sonner.custom}
      </Button>
    </div>
  );
}
