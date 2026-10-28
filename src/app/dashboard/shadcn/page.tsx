import * as React from "react";
import { Suspense } from "react";

import ShowcaseIndex from "@/modules/components//showcase-index";
import { Skeleton } from "@/modules/components//ui/skeleton";

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
  { id: "accordion", label: "Accordion", Demo: AccordionDemo },
  { id: "alert", label: "Alert", Demo: AlertDemo },
  { id: "alert-dialog", label: "Alert dialog", Demo: AlertDialogDemo },
  { id: "avatar", label: "Avatar", Demo: AvatarDemo },
  { id: "badge", label: "Badge", Demo: BadgeDemo },
  { id: "button", label: "Button", Demo: ButtonDemo },
  { id: "calendar", label: "Calendar", Demo: CalendarDemo },
  { id: "card", label: "Card", Demo: CardDemo },
  { id: "carousel", label: "Carousel", Demo: CarouselDemo },
  { id: "checkbox", label: "Checkbox", Demo: CheckboxDemo },
  { id: "combobox", label: "Combobox", Demo: ComboboxDemo },
  { id: "command", label: "Command", Demo: CommandDemo },
  { id: "context-menu", label: "Context menu", Demo: ContextMenuDemo },
  { id: "dialog", label: "Dialog", Demo: DialogDemo },
  { id: "input-otp", label: "Input OTP", Demo: InputOTPDemo },
  { id: "menubar", label: "Menubar", Demo: MenubarDemo },
  { id: "progress", label: "Progress", Demo: ProgressDemo },
  { id: "sheet", label: "Sheet", Demo: SheetDemo },
  { id: "skeleton", label: "Skeleton", Demo: SkeletonDemo },
  { id: "slider", label: "Slider", Demo: SliderDemo },
  { id: "sonner", label: "Sonner", Demo: SonnerDemo },
  { id: "tabs", label: "Tabs", Demo: TabsDemo },
  { id: "toast", label: "Toast", Demo: ToastDemo },
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
          Shadcn
        </h1>
        <p className="mt-2 max-w-[65ch] text-sm text-muted-foreground">
          All {sections.length} component demos from the dashboard, collected on
          a single page.
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
