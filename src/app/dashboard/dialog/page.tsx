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
import { uiText } from "@/modules/data/ui-text";

export default function DialogCloseButton() {
  return (
    <Dialog>
      <DialogTrigger
        render={<Button variant="outline">{uiText.demo.dialog.share}</Button>}
      />

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{uiText.demo.dialog.title}</DialogTitle>
          <DialogDescription>
            {uiText.demo.dialog.description}
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              {uiText.demo.dialog.link}
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
          <DialogClose
            render={<Button type="button">{uiText.demo.dialog.close}</Button>}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
