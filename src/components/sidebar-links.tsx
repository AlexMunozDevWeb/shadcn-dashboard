"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Archive,
  BarChart3,
  Boxes,
  CalendarDays,
  ChevronDown,
  Copy,
  Gauge,
  Map,
  PenTool,
  Table,
  type LucideIcon,
} from "lucide-react";
import { usePaperTheme } from "./theme-provider";

export type NavSubItem = {
  name: string;
  href: string;
};

export type NavItem = {
  name: string;
  href: string;
  icon: LucideIcon;
  children?: NavSubItem[];
};

export const navItems: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: Gauge },
  {
    name: "Pages",
    href: "#",
    icon: Copy,
    children: [
      { name: "Profile", href: "/dashboard" },
      { name: "Pricing", href: "/dashboard/card" },
      { name: "Timeline", href: "/dashboard/progress" },
      { name: "Login Modal", href: "/dashboard/dialog" },
      { name: "Register Drawer", href: "/dashboard/sheet" },
    ],
  },
  {
    name: "Components",
    href: "#",
    icon: Boxes,
    children: [
      { name: "Buttons", href: "/dashboard/button" },
      { name: "Cards", href: "/dashboard/card" },
      { name: "Badges", href: "/dashboard/badge" },
      { name: "Alerts", href: "/dashboard/alert" },
      { name: "Dialogs", href: "/dashboard/dialog" },
      { name: "Tabs", href: "/dashboard/tabs" },
      { name: "Toasts & Sonner", href: "/dashboard/toast" },
      { name: "Checkbox & Select", href: "/dashboard/checkbox" },
      { name: "Sliders", href: "/dashboard/slider" },
      { name: "Accordions", href: "/dashboard/accordion" },
      { name: "Avatars", href: "/dashboard/avatar" },
    ],
  },
  {
    name: "Forms",
    href: "#",
    icon: PenTool,
    children: [
      { name: "Input OTP", href: "/dashboard/input-opt" },
      { name: "Combobox", href: "/dashboard/combobox" },
      { name: "Carousels", href: "/dashboard/carousel" },
      { name: "Form", href: "/dashboard/form" },
    ],
  },
  {
    name: "Tables",
    href: "#",
    icon: Table,
    children: [
      { name: "Command Palette", href: "/dashboard/command" },
      { name: "Menubar", href: "/dashboard/menubar" },
      { name: "Context Menu", href: "/dashboard/context-menu" },
      { name: "Data Table", href: "/dashboard/data-table" },
    ],
  },
  {
    name: "Maps",
    href: "#",
    icon: Map,
    children: [
      { name: "Vector Heatmap", href: "/dashboard" },
      { name: "Skeleton Loader", href: "/dashboard/skeleton" },
    ],
  },
  { name: "Widgets", href: "/dashboard/shadcn", icon: Archive },
  { name: "Charts", href: "/dashboard/progress", icon: BarChart3 },
  { name: "Calendar", href: "/dashboard/calendar", icon: CalendarDays },
];

export default function SidebarLinks() {
  const pathname = usePathname();
  const { activeAccentHex, sidebarConfig } = usePaperTheme();
  const isDashboardHome = pathname === "/dashboard";

  return (
    <nav className="custom-scroll mt-4 max-h-[calc(100vh-215px)] space-y-1.5 overflow-y-auto px-3">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = item.href !== "#" && pathname === item.href;
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
            href={item.href}
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
