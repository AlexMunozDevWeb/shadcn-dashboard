import * as React from "react";
import { Suspense } from "react";

import ShowcaseIndex from "@/modules/components//showcase-index";
import { Skeleton } from "@/modules/components//ui/skeleton";
import { uiText } from "@/modules/data/ui-text";

import AccordionDemo from "../accordion/page";
import AlertDemo from "../alert/page";
import AlertDialogDemo from "../alert-dialog/page";
import AvatarDemo from "../avatar/page";
import BadgeDemo from "../badge/page";
import ButtonDemo from "../button/page";
import CalendarDemo from "../calendar/page";
import CardDemo from "../card/page";
import CarouselDemo from "../carousel/page";
import CheckboxDemo from "../checkbox/page";
import ComboboxDemo from "../combobox/page";
import CommandDemo from "../command/page";
import ContextMenuDemo from "../context-menu/page";
import DialogDemo from "../dialog/page";
import InputOTPDemo from "../input-opt/page";
import MenubarDemo from "../menubar/page";
import ProgressDemo from "../progress/page";
import SheetDemo from "../sheet/page";
import SkeletonDemo from "../skeleton/page";
import SliderDemo from "../slider/page";
import SonnerDemo from "../sonner/page";
import TabsDemo from "../tabs/page";
import ToastDemo from "../toast/page";

type ShowcaseSection = {
  id: string;
  label: string;
  Demo: React.ElementType;
};

const sections: ShowcaseSection[] = [
  {
    id: "accordion",
    label: uiText.demo.showcase.sections.accordion,
    Demo: AccordionDemo,
  },
  { id: "alert", label: uiText.demo.showcase.sections.alert, Demo: AlertDemo },
  {
    id: "alert-dialog",
    label: uiText.demo.showcase.sections.alertDialog,
    Demo: AlertDialogDemo,
  },
  {
    id: "avatar",
    label: uiText.demo.showcase.sections.avatar,
    Demo: AvatarDemo,
  },
  { id: "badge", label: uiText.demo.showcase.sections.badge, Demo: BadgeDemo },
  {
    id: "button",
    label: uiText.demo.showcase.sections.button,
    Demo: ButtonDemo,
  },
  {
    id: "calendar",
    label: uiText.demo.showcase.sections.calendar,
    Demo: CalendarDemo,
  },
  { id: "card", label: uiText.demo.showcase.sections.card, Demo: CardDemo },
  {
    id: "carousel",
    label: uiText.demo.showcase.sections.carousel,
    Demo: CarouselDemo,
  },
  {
    id: "checkbox",
    label: uiText.demo.showcase.sections.checkbox,
    Demo: CheckboxDemo,
  },
  {
    id: "combobox",
    label: uiText.demo.showcase.sections.combobox,
    Demo: ComboboxDemo,
  },
  {
    id: "command",
    label: uiText.demo.showcase.sections.command,
    Demo: CommandDemo,
  },
  {
    id: "context-menu",
    label: uiText.demo.showcase.sections.contextMenu,
    Demo: ContextMenuDemo,
  },
  {
    id: "dialog",
    label: uiText.demo.showcase.sections.dialog,
    Demo: DialogDemo,
  },
  {
    id: "input-otp",
    label: uiText.demo.showcase.sections.inputOtp,
    Demo: InputOTPDemo,
  },
  {
    id: "menubar",
    label: uiText.demo.showcase.sections.menubar,
    Demo: MenubarDemo,
  },
  {
    id: "progress",
    label: uiText.demo.showcase.sections.progress,
    Demo: ProgressDemo,
  },
  { id: "sheet", label: uiText.demo.showcase.sections.sheet, Demo: SheetDemo },
  {
    id: "skeleton",
    label: uiText.demo.showcase.sections.skeleton,
    Demo: SkeletonDemo,
  },
  {
    id: "slider",
    label: uiText.demo.showcase.sections.slider,
    Demo: SliderDemo,
  },
  {
    id: "sonner",
    label: uiText.demo.showcase.sections.sonner,
    Demo: SonnerDemo,
  },
  { id: "tabs", label: uiText.demo.showcase.sections.tabs, Demo: TabsDemo },
  { id: "toast", label: uiText.demo.showcase.sections.toast, Demo: ToastDemo },
];

function SkeletonFallback() {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col justify-between rounded-md border border-border bg-card p-4"
        >
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ShadcnShowcasePage() {
  return (
    <div>
      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground/80">
          {uiText.demo.showcase.shadcn}
        </h1>
        <p className="mt-2 max-w-[65ch] text-sm text-muted-foreground">
          {uiText.demo.showcase.description}
        </p>
      </header>

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_13rem] lg:items-start lg:gap-x-12">
        <ShowcaseIndex
          items={sections.map(({ id, label }) => ({ id, label }))}
        />

        <div className="min-w-0 lg:col-start-1 lg:row-start-1">
          {sections.map(({ id, label, Demo }, index) => (
            <section
              key={id}
              id={id}
              className={`scroll-mt-24 ${index > 0 ? "mt-10" : ""}`}
            >
              <h2 className="border-b border-primary/40 pb-2 text-lg font-semibold tracking-tight text-foreground/80">
                {label}
              </h2>
              <div className="mt-4">
                {id === "skeleton" ? (
                  <Suspense fallback={<SkeletonFallback />}>
                    <Demo />
                  </Suspense>
                ) : (
                  <Demo />
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
