"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

export default function SheetDemo() {
  const SHEET_SIDES = ["top", "right", "bottom", "left"] as const;

  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            onClick={() => setOpen(true)}
            render={<Button variant="outline">Open</Button>}
          />
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid flex-1 auto-rows-min gap-6 px-4">
              <div className="grid gap-3">
                <Label htmlFor="sheet-demo-name">Name</Label>
                <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="sheet-demo-username">Username</Label>
                <Input id="sheet-demo-username" defaultValue="@peduarte" />
              </div>
            </div>
            <SheetFooter>
              <Button type="submit">Save changes</Button>
              <SheetClose render={<Button variant="outline">Close</Button>} />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex flex-wrap gap-2">
        {SHEET_SIDES.map((side) => (
          <Sheet key={side}>
            <SheetTrigger
              render={
                <Button variant="outline" className="capitalize">
                  {side}
                </Button>
              }
            />
            <SheetContent
              side={side}
              className="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]"
            >
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </SheetDescription>
              </SheetHeader>
              <div className="no-scrollbar overflow-y-auto px-4">
                {Array.from({ length: 10 }).map((_, index) => (
                  <p key={index} className="mb-2 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                ))}
              </div>
              <SheetFooter>
                <Button type="submit">Save changes</Button>
                <SheetClose
                  render={<Button variant="outline">Cancel</Button>}
                />
              </SheetFooter>
            </SheetContent>
          </Sheet>
        ))}
      </div>
    </div>
  );
}
