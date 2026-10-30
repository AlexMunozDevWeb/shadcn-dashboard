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

export default function AlertDialogDemo() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="grid w-full max-w-md items-start gap-4">
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogTrigger
          render={<Button variant="outline">Show Dialog</Button>}
        />

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => toast.info("Action cancelled.")}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => toast.success("Action confirmed.")}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Button onClick={() => setDialogOpen(true)}>Open Dialog</Button>
    </div>
  );
}
