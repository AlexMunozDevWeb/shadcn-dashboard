"use client";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/modules/components//ui/alert-dialog";
import { Button } from "@/modules/components//ui/button";
import { toast } from "sonner";
import { uiText } from "@/modules/data/ui-text";

export default function AlertDialogDemo() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="grid w-full max-w-md items-start gap-4">
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogTrigger
          render={
            <Button variant="outline">{uiText.demo.alertDialog.show}</Button>
          }
        />

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{uiText.demo.alertDialog.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {uiText.demo.alertDialog.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => toast.info(uiText.demo.alertDialog.cancelled)}
            >
              {uiText.demo.alertDialog.cancel}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => toast.success(uiText.demo.alertDialog.confirmed)}
            >
              {uiText.demo.alertDialog.continue}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Button onClick={() => setDialogOpen(true)}>
        {uiText.demo.alertDialog.open}
      </Button>
    </div>
  );
}
