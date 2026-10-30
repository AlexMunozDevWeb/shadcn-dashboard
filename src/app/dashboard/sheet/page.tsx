"use client";
import { Button } from "@/modules/components//ui/button";
import { Input } from "@/modules/components//ui/input";
import { Label } from "@/modules/components//ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/modules/components//ui/sheet";
import { useState } from "react";
import { uiText } from "@/modules/data/ui-text";

export default function SheetDemo() {
  const SHEET_SIDES = ["top", "right", "bottom", "left"] as const;

  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            onClick={() => setOpen(true)}
            render={<Button variant="outline">{uiText.demo.sheet.open}</Button>}
          />
          <SheetContent>
            <SheetHeader>
              <SheetTitle>{uiText.demo.sheet.title}</SheetTitle>
              <SheetDescription>
                {uiText.demo.sheet.description}
              </SheetDescription>
            </SheetHeader>
            <div className="grid flex-1 auto-rows-min gap-6 px-4">
              <div className="grid gap-3">
                <Label htmlFor="sheet-demo-name">
                  {uiText.demo.sheet.name}
                </Label>
                <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="sheet-demo-username">
                  {uiText.demo.sheet.username}
                </Label>
                <Input id="sheet-demo-username" defaultValue="@peduarte" />
              </div>
            </div>
            <SheetFooter>
              <Button type="submit">{uiText.demo.sheet.save}</Button>
              <SheetClose
                render={
                  <Button variant="outline">{uiText.demo.sheet.close}</Button>
                }
              />
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
                <SheetTitle>{uiText.demo.sheet.title}</SheetTitle>
                <SheetDescription>
                  {uiText.demo.sheet.description}
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
                <Button type="submit">{uiText.demo.sheet.save}</Button>
                <SheetClose
                  render={
                    <Button variant="outline">
                      {uiText.demo.sheet.cancel}
                    </Button>
                  }
                />
              </SheetFooter>
            </SheetContent>
          </Sheet>
        ))}
      </div>
    </div>
  );
}
