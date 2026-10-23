"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Bell,
  CheckCircle2,
  ChevronDown,
  Gauge,
  Map,
  Menu,
  Plus,
  Search,
  Settings,
  X,
} from "lucide-react";

import SidebarLinks, { navItems } from "@/components/sidebar-links";
import SettingsFab from "@/components/settings-fab";
import { usePaperTheme } from "./theme-provider";

function ReactMark({
  className,
  color,
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      style={{ fill: color || "#51cbce" }}
    >
      <circle cx="12" cy="12" r="2.05" />
      <g fill="none" stroke={color || "#51cbce"} strokeWidth="1.2">
        <ellipse cx="12" cy="12" rx="11" ry="4.2" />
        <ellipse
          cx="12"
          cy="12"
          rx="11"
          ry="4.2"
          transform="rotate(60 12 12)"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="11"
          ry="4.2"
          transform="rotate(120 12 12)"
        />
      </g>
    </svg>
  );
}

function DrawerNav({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  const { activeAccentHex } = usePaperTheme();
  const isDashboardHome = pathname === "/dashboard";

  return (
    <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = item.href !== "#" && pathname === item.href;
        const hasChildren = Boolean(item.children && item.children.length > 0);

        if (hasChildren) {
          return (
            <div key={item.name} className="py-1">
              <span
                className="block px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase"
                style={{ color: activeAccentHex }}
              >
                {item.name}
              </span>
              <div className="space-y-1 pl-2">
                {item.children?.map((child) => {
                  const currentChild =
                    !isDashboardHome && pathname === child.href;
                  return (
                    <Link
                      key={child.name}
                      href={child.href}
                      onClick={onClose}
                      className={cn(
                        "block rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                        currentChild
                          ? "font-bold text-white shadow-xs"
                          : "text-gray-300 hover:bg-white/10 hover:text-white",
                      )}
                      style={
                        currentChild
                          ? {
                              backgroundColor: activeAccentHex,
                              color: "#ffffff",
                            }
                          : undefined
                      }
                    >
                      {child.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        }

        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={onClose}
            className={cn(
              "flex items-center space-x-3 rounded-lg px-3 py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors",
              active
                ? "text-white shadow-xs"
                : "text-gray-300 hover:bg-white/10 hover:text-white",
            )}
            style={
              active
                ? { backgroundColor: activeAccentHex, color: "#ffffff" }
                : undefined
            }
          >
            <Icon className="h-4.5 w-4.5" />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function TabletRail() {
  const pathname = usePathname();
  const { activeAccentHex, sidebarConfig } = usePaperTheme();

  return (
    <aside
      className="z-30 hidden min-h-screen w-20 flex-shrink-0 flex-col justify-between shadow-xl transition-all duration-300 md:flex lg:hidden"
      style={{
        backgroundColor: sidebarConfig.bg,
        borderRight: `1px solid ${sidebarConfig.border}`,
        color: sidebarConfig.text,
      }}
    >
      <div>
        <div
          className="flex h-16 items-center justify-center border-b"
          style={{ borderColor: sidebarConfig.border }}
        >
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full font-bold text-white shadow-sm"
            style={{ backgroundColor: activeAccentHex }}
          >
            <ReactMark className="h-5 w-5 animate-spin-slow" color="#ffffff" />
          </div>
        </div>
        <div
          className="flex items-center justify-center border-b px-2 py-4"
          style={{ borderColor: sidebarConfig.border }}
        >
          <span
            className="text-xs font-bold tracking-wider uppercase font-heading"
            style={{ color: sidebarConfig.text }}
          >
            CF
          </span>
        </div>
        <nav className="mt-4 space-y-2 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = item.href !== "#" && pathname === item.href;
            return (
              <Link
                key={item.name}
                href={
                  item.href === "#" && item.children?.[0]?.href
                    ? item.children[0].href
                    : item.href
                }
                title={item.name}
                aria-label={item.name}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-10 w-full items-center justify-center rounded-lg transition-all",
                  active
                    ? "shadow-sm"
                    : "opacity-75 hover:opacity-100 hover:bg-white/5",
                )}
                style={
                  active
                    ? {
                        backgroundColor: activeAccentHex,
                        color: "#ffffff",
                      }
                    : { color: sidebarConfig.textMuted }
                }
              >
                <Icon className="h-4.5 w-4.5" />
              </Link>
            );
          })}
        </nav>
      </div>
      <div
        className="border-t p-4 text-center"
        style={{ borderColor: sidebarConfig.border }}
      >
        <CheckCircle2
          className="mx-auto h-3.5 w-3.5"
          style={{ color: activeAccentHex }}
        />
      </div>
    </aside>
  );
}

const bottomTabs = [
  { name: "Dashboard", href: "/dashboard", icon: Gauge },
  { name: "Widgets", href: "/dashboard/shadcn", icon: BarChart3 },
  { name: "Components", href: "/dashboard/button", icon: Map },
  { name: "Settings", href: "/dashboard/card", icon: Settings },
];

function BottomNav() {
  const pathname = usePathname();
  const { activeAccentHex } = usePaperTheme();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200/80 bg-white/95 px-4 py-2 shadow-bottom-nav backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-md items-center justify-around">
        {bottomTabs.slice(0, 2).map((tab) => (
          <BottomTab
            key={tab.name}
            tab={tab}
            active={pathname === tab.href}
            accentColor={activeAccentHex}
          />
        ))}

        <div className="flex items-center justify-center px-1">
          <button
            type="button"
            aria-label="Acción rápida"
            className="-mt-4 flex h-11 w-11 items-center justify-center rounded-full text-white shadow-lg transition duration-200 hover:scale-105 active:scale-95"
            style={{ backgroundColor: activeAccentHex }}
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        {bottomTabs.slice(2).map((tab) => (
          <BottomTab
            key={tab.name}
            tab={tab}
            active={pathname === tab.href}
            accentColor={activeAccentHex}
          />
        ))}
      </div>
    </nav>
  );
}

function BottomTab({
  tab,
  active,
  accentColor,
}: {
  tab: (typeof bottomTabs)[number];
  active: boolean;
  accentColor: string;
}) {
  return (
    <Link
      href={tab.href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex flex-1 flex-col items-center justify-center py-1 transition active:scale-95",
        active ? "font-semibold" : "text-gray-400 hover:text-gray-600",
      )}
      style={active ? { color: accentColor } : undefined}
    >
      <tab.icon className="mb-0.5 h-4.5 w-4.5" />
      <span className="text-[10px] tracking-tight">{tab.name}</span>
    </Link>
  );
}

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { activeAccentHex, sidebarConfig } = usePaperTheme();

  return (
    <div className="flex min-h-screen overflow-x-hidden bg-paper">
      {/* Desktop sidebar */}
      <aside
        className="z-30 hidden min-h-screen w-64 flex-shrink-0 flex-col justify-between shadow-xl transition-all duration-300 lg:flex"
        style={{
          backgroundColor: sidebarConfig.bg,
          borderRight: `1px solid ${sidebarConfig.border}`,
          color: sidebarConfig.text,
        }}
      >
        <div>
          {/* Brand header */}
          <div
            className="flex items-center gap-3 px-6 py-5 border-b"
            style={{ borderColor: sidebarConfig.border }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md">
              <ReactMark
                className="h-6 w-6 animate-spin-slow"
                color={activeAccentHex}
              />
            </div>
            <div>
              <span
                className="block text-sm font-bold tracking-wider uppercase font-heading"
                style={{ color: sidebarConfig.text }}
              >
                Creative Tim
              </span>
              <span
                className="block text-[11px] font-medium tracking-tight"
                style={{ color: sidebarConfig.textMuted }}
              >
                Paper Dashboard PRO
              </span>
            </div>
          </div>

          {/* User profile section */}
          <div
            className="flex items-center justify-between px-6 py-4 border-b"
            style={{ borderColor: sidebarConfig.border }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full font-bold text-xs text-white shadow-sm ring-2 ring-offset-1"
                style={{
                  backgroundColor: activeAccentHex,
                }}
              >
                CF
              </div>
              <div>
                <h4
                  className="cursor-pointer text-xs font-bold tracking-wide transition-colors font-heading"
                  style={{ color: sidebarConfig.text }}
                >
                  Chet Faker
                </h4>
                <span
                  className="block text-[10px] font-semibold tracking-wider uppercase"
                  style={{ color: activeAccentHex }}
                >
                  Administrator
                </span>
              </div>
            </div>
            <ChevronDown className="h-3 w-3 cursor-pointer opacity-50 hover:opacity-100" />
          </div>

          {/* Sidebar Nav links */}
          <SidebarLinks />
        </div>

        {/* Sidebar footer badge */}
        <div
          className="p-4 text-center border-t"
          style={{ borderColor: sidebarConfig.border }}
        >
          <div
            className="flex items-center justify-center gap-2 text-[11px] font-medium"
            style={{ color: sidebarConfig.textMuted }}
          >
            <CheckCircle2
              className="h-3.5 w-3.5"
              style={{ color: activeAccentHex }}
            />
            <span>Paper PRO v2.1.0</span>
          </div>
        </div>
      </aside>

      <TabletRail />

      {/* Mobile Drawer */}
      <div
        id="sidebar-drawer"
        className={cn(
          "pointer-events-none fixed inset-0 z-50 transition-opacity duration-300 lg:hidden",
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0",
        )}
        aria-hidden={!drawerOpen}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          onClick={() => setDrawerOpen(false)}
        />
        <aside
          className={cn(
            "relative flex h-full w-72 max-w-[80vw] flex-col shadow-2xl transition-transform duration-300",
            drawerOpen ? "translate-x-0" : "-translate-x-full",
          )}
          style={{
            backgroundColor: sidebarConfig.bg,
            color: sidebarConfig.text,
          }}
        >
          <div
            className="flex items-center justify-between border-b p-5"
            style={{ borderColor: sidebarConfig.border }}
          >
            <div className="flex items-center space-x-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
                <ReactMark
                  className="h-5 w-5 animate-spin-slow"
                  color={activeAccentHex}
                />
              </div>
              <span
                className="text-xs font-bold tracking-wider uppercase font-heading"
                style={{ color: sidebarConfig.text }}
              >
                Paper Dashboard PRO
              </span>
            </div>
            <button
              type="button"
              aria-label="Cerrar menú"
              onClick={() => setDrawerOpen(false)}
              className="p-1 text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div
            className="flex items-center space-x-3 border-b bg-white/5 p-4"
            style={{ borderColor: sidebarConfig.border }}
          >
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm"
              style={{ backgroundColor: activeAccentHex }}
            >
              CF
            </div>
            <div className="min-w-0">
              <p
                className="truncate text-xs font-bold font-heading"
                style={{ color: sidebarConfig.text }}
              >
                Chet Faker
              </p>
              <span
                className="text-[10px] font-semibold tracking-wider uppercase"
                style={{ color: activeAccentHex }}
              >
                Administrator
              </span>
            </div>
          </div>

          <DrawerNav onClose={() => setDrawerOpen(false)} />
        </aside>
      </div>

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto pb-16 md:pb-0">
        {/* Top Navbar */}
        <header className="flex h-20 items-center justify-between border-b border-[#e3e1dc] bg-transparent px-4 sm:px-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Abrir menú"
              aria-controls="sidebar-drawer"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-paper-sm transition duration-200 hover:scale-105 active:scale-95 lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
            <div>
              <h1 className="text-base sm:text-xl md:text-2xl lg:text-2xl font-bold tracking-tight text-[#252422] font-heading">
                Paper Dashboard PRO React
              </h1>
              <p className="hidden text-xs sm:text-xs md:text-sm lg:text-sm font-medium text-paper-muted sm:block">
                Enterprise SaaS Administration &amp; System Telemetry
              </p>
            </div>
          </div>

          {/* Search and Action Controls */}
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="relative hidden w-64 sm:block">
              <input
                type="search"
                placeholder="Search..."
                aria-label="Search"
                className="h-9 w-full rounded-full border border-gray-200 bg-white pr-9 pl-4 text-xs text-gray-700 shadow-xs placeholder:text-gray-400 focus:outline-none focus:ring-2"
                style={{
                  outlineColor: activeAccentHex,
                }}
              />
              <Search className="pointer-events-none absolute top-1/2 right-3.5 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            </div>

            <div className="flex items-center gap-2.5">
              {/* Notification icon */}
              <div className="relative">
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-paper-sm transition duration-200 hover:scale-105"
                  aria-label="Notifications"
                >
                  <Bell className="h-4 w-4" />
                </button>
                <span className="absolute -top-0.5 right-0 h-2.5 w-2.5 rounded-full bg-accent-coral ring-2 ring-white" />
              </div>

              {/* Settings gear */}
              <button
                type="button"
                className="hidden h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-paper-sm transition duration-200 hover:scale-105 sm:flex"
                aria-label="Settings"
                onClick={() => {
                  const fabBtn = document.querySelector(
                    'aside button[aria-label="Configuración de diseño"]',
                  ) as HTMLButtonElement;
                  if (fabBtn) fabBtn.click();
                }}
              >
                <Settings className="h-4 w-4" />
              </button>

              {/* User badge */}
              <div className="hidden items-center gap-2.5 border-l border-gray-300 pl-3 md:flex">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm"
                  style={{ backgroundColor: activeAccentHex }}
                >
                  CF
                </div>
                <div className="text-left">
                  <span className="block text-xs md:text-sm font-bold text-gray-800 leading-tight font-heading">
                    Chet Faker
                  </span>
                  <span className="block text-[10px] md:text-xs font-medium text-gray-500">
                    Administrator
                  </span>
                </div>
                <ChevronDown className="h-3 w-3 text-gray-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Body */}
        <main className="flex-1 space-y-8 p-4 sm:p-8">{children}</main>

        {/* Footer */}
        <footer className="flex flex-col items-center justify-between gap-3 border-t border-[#e3e1dc] bg-transparent px-4 py-5 text-xs md:text-sm text-gray-600 sm:flex-row sm:px-8">
          <div className="mb-2 flex items-center gap-6 sm:mb-0">
            {["Creative Tim", "Blog", "Licenses"].map((label) => (
              <a
                key={label}
                href="https://www.creative-tim.com"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] sm:text-xs md:text-sm font-semibold tracking-wider uppercase transition-colors hover:text-accent-teal font-heading"
              >
                {label}
              </a>
            ))}
          </div>
          <div className="text-center sm:text-right text-[11px] sm:text-xs md:text-sm text-gray-500 font-medium">
            © 2026, crafted with{" "}
            <span className="text-accent-coral font-bold" aria-hidden>
              ♥
            </span>{" "}
            by{" "}
            <span className="font-bold text-gray-700 font-heading">
              Creative Tim
            </span>{" "}
            &amp; Antigravity for a better web.
          </div>
        </footer>
      </div>

      <BottomNav />
      <SettingsFab />
    </div>
  );
}
