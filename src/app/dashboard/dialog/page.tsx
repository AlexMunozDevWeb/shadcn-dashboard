"use client";
import { Button } from "@/modules/components//ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/modules/components//ui/dialog";
import { Input } from "@/modules/components//ui/input";
import { Label } from "@/modules/components//ui/label";

export default function DialogCloseButton() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Share</Button>} />

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              onClick={() =>
                navigator.clipboard.writeText(
                  "https://ui.shadcn.com/docs/installation",
                )
              }
              defaultValue="https://ui.shadcn.com/docs/installation"
              readOnly
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose render={<Button type="button">Close</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
