"use client";

import { Button } from "@/modules/components//ui/button";
import { toast } from "@/modules/components//ui/toast";
import { uiText } from "@/modules/data/ui-text";

export default function ToastDemo() {
  function showToast() {
    toast.add({
      title: uiText.demo.toast.title,
      description: uiText.demo.toast.date,
    });
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      <Button variant="outline" onClick={showToast}>
        {uiText.demo.toast.show}
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.add({ description: uiText.demo.toast.created })}
      >
        {uiText.demo.toast.default}
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            type: "success",
            description: uiText.demo.toast.created,
          })
        }
      >
        {uiText.demo.toast.success}
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            type: "info",
            description: uiText.demo.toast.arrive,
          })
        }
      >
        {uiText.demo.toast.info}
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            type: "warning",
            description: uiText.demo.toast.tooEarly,
          })
        }
      >
        {uiText.demo.toast.warning}
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            type: "error",
            description: uiText.demo.toast.failed,
            priority: "high",
          })
        }
      >
        {uiText.demo.toast.error}
      </Button>
    </div>
  );
}
