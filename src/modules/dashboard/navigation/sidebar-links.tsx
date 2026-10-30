"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/modules/lib/utils";
import {
  Archive,
  BarChart3,
  Boxes,
  CalendarDays,
  ChevronDown,
  Copy,
  Database,
  Gauge,
  MousePointer2,
  PenTool,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { usePaperTheme } from "@/modules/components/theme-provider";
import { uiText } from "@/modules/data/ui-text";

export type NavSubItem = {
  name: string;
  href: string;
};

export type NavItem = {
  name: string;
  href?: string;
  icon: LucideIcon;
  children?: NavSubItem[];
};

export const navItems: NavItem[] = [
  { name: uiText.navigation.dashboard, href: "/dashboard", icon: Gauge },
  {
    name: uiText.navigation.pages,
    icon: Copy,
    children: [
      { name: uiText.navigation.profile, href: "/dashboard" },
      { name: uiText.navigation.pricing, href: "/dashboard/card" },
      { name: uiText.navigation.timeline, href: "/dashboard/progress" },
      { name: uiText.navigation.loginModal, href: "/dashboard/dialog" },
      { name: uiText.navigation.registerDrawer, href: "/dashboard/sheet" },
    ],
  },
  {
    name: uiText.navigation.components,
    icon: Boxes,
    children: [
      { name: uiText.navigation.buttons, href: "/dashboard/button" },
      { name: uiText.navigation.cards, href: "/dashboard/card" },
      { name: uiText.navigation.badges, href: "/dashboard/badge" },
      { name: uiText.navigation.alerts, href: "/dashboard/alert" },
      { name: uiText.navigation.dialogs, href: "/dashboard/dialog" },
      { name: uiText.navigation.tabs, href: "/dashboard/tabs" },
      { name: uiText.navigation.toasts, href: "/dashboard/toast" },
      { name: uiText.navigation.checkboxSelect, href: "/dashboard/checkbox" },
      { name: uiText.navigation.sliders, href: "/dashboard/slider" },
      { name: uiText.navigation.accordions, href: "/dashboard/accordion" },
      { name: uiText.navigation.avatars, href: "/dashboard/avatar" },
    ],
  },
  {
    name: uiText.navigation.forms,
    icon: PenTool,
    children: [
      { name: uiText.navigation.inputOtp, href: "/dashboard/input-opt" },
      { name: uiText.navigation.combobox, href: "/dashboard/combobox" },
      { name: uiText.navigation.carousels, href: "/dashboard/carousel" },
      { name: uiText.navigation.form, href: "/dashboard/form" },
    ],
  },
  {
    name: uiText.navigation.interactions,
    icon: MousePointer2,
    children: [
      { name: uiText.navigation.commandPalette, href: "/dashboard/command" },
      { name: uiText.navigation.menubar, href: "/dashboard/menubar" },
      { name: uiText.navigation.contextMenu, href: "/dashboard/context-menu" },
    ],
  },
  {
    name: uiText.navigation.data,
    icon: Database,
    children: [
      { name: uiText.navigation.dataTable, href: "/dashboard/data-table" },
    ],
  },
  {
    name: uiText.navigation.utilities,
    icon: Wrench,
    children: [
      { name: uiText.navigation.skeletonLoader, href: "/dashboard/skeleton" },
    ],
  },
  { name: uiText.navigation.widgets, href: "/dashboard/shadcn", icon: Archive },
  {
    name: uiText.navigation.charts,
    href: "/dashboard/progress",
    icon: BarChart3,
  },
  {
    name: uiText.navigation.calendar,
    href: "/dashboard/calendar",
    icon: CalendarDays,
  },
];

export default function SidebarLinks() {
  const pathname = usePathname();
  const { activeAccentHex, sidebarConfig } = usePaperTheme();
  const isDashboardHome = pathname === "/dashboard";

  return (
    <nav className="custom-scroll mt-4 max-h-[calc(100vh-215px)] space-y-1.5 overflow-y-auto px-3">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = Boolean(item.href && pathname === item.href);
        const hasChildren = Boolean(item.children && item.children.length > 0);
        const childIsActive =
          hasChildren &&
          !isDashboardHome &&
          item.children?.some((child) => child.href === pathname);

        const inner = (
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-3.5">
              <Icon
                className={cn(
                  "w-5 text-center text-base transition-colors",
                  active ? "" : "opacity-85",
                )}
                style={active ? { color: activeAccentHex } : undefined}
              />
              <span className="font-heading tracking-wider">{item.name}</span>
            </div>
            {hasChildren && (
              <ChevronDown className="h-2.5 w-2.5 text-[10px] opacity-60 transition-transform duration-200 group-open:rotate-180" />
            )}
          </div>
        );

        if (hasChildren) {
          return (
            <details key={item.name} open={childIsActive} className="group">
              <summary
                className={cn(
                  "relative flex cursor-pointer list-none items-center gap-3.5 rounded-lg px-4 py-2.5 text-xs md:text-sm font-semibold tracking-wider uppercase transition-all duration-200 select-none [&::-webkit-details-marker]:hidden",
                  childIsActive ? "font-semibold" : "hover:bg-white/5",
                )}
                style={{
                  color: childIsActive
                    ? activeAccentHex
                    : sidebarConfig.textMuted,
                }}
              >
                {inner}
              </summary>
              <ul className="mt-1 space-y-1 pl-11">
                {item.children?.map((child) => {
                  const isCurrentChild =
                    !isDashboardHome && pathname === child.href;
                  return (
                    <li key={child.name}>
                      <Link
                        href={child.href}
                        className={cn(
                          "block rounded-md px-3 py-1.5 text-[11px] sm:text-xs md:text-xs font-medium tracking-wide transition-colors",
                          isCurrentChild
                            ? "font-bold"
                            : "opacity-75 hover:opacity-100",
                        )}
                        style={{
                          color: isCurrentChild
                            ? activeAccentHex
                            : sidebarConfig.textMuted,
                          backgroundColor: isCurrentChild
                            ? "rgba(255, 255, 255, 0.06)"
                            : "transparent",
                        }}
                      >
                        {child.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </details>
          );
        }

        return (
          <Link
            key={item.name}
            href={item.href ?? "/dashboard"}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative flex items-center gap-3.5 rounded-lg px-4 py-2.5 text-xs md:text-sm font-semibold tracking-wider uppercase transition-all duration-200",
              active ? "nav-item-active py-3" : "hover:bg-white/5",
            )}
            style={{
              color: active ? activeAccentHex : sidebarConfig.textMuted,
            }}
          >
            <div className="flex items-center gap-3.5">
              <Icon
                className="w-5 text-center text-base"
                style={active ? { color: activeAccentHex } : undefined}
              />
              <span className="font-heading tracking-wider">{item.name}</span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
