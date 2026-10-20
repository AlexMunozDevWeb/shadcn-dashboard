"use client";

import { useState } from "react";
import { Check, ExternalLink, HelpCircle, Settings, X } from "lucide-react";
import {
  type AccentTheme,
  type SidebarTheme,
  accentHexMap,
  usePaperTheme,
} from "./theme-provider";
import { cn } from "@/lib/utils";

const sidebarOptions: { id: SidebarTheme; label: string; color: string }[] = [
  { id: "dark", label: "Dark Carbon", color: "#212120" },
  { id: "slate", label: "Slate Industrial", color: "#2b303a" },
  { id: "white", label: "Clean White", color: "#ffffff" },
];

const accentOptions: { id: AccentTheme; label: string; color: string }[] = [
  { id: "teal", label: "Cyan Teal", color: accentHexMap.teal },
  { id: "blue", label: "Sky Blue", color: accentHexMap.blue },
  { id: "mint", label: "Fresh Mint", color: accentHexMap.mint },
  { id: "yellow", label: "Radiant Amber", color: accentHexMap.yellow },
  { id: "coral", label: "Warm Coral", color: accentHexMap.coral },
];

export default function SettingsFab() {
  const [isOpen, setIsOpen] = useState(false);
  const { sidebarTheme, setSidebarTheme, accentTheme, setAccentTheme, activeAccentHex } =
    usePaperTheme();

  return (
    <aside className="fixed right-6 bottom-8 z-50">
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Configuración de diseño"
          aria-expanded={isOpen}
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95",
            isOpen ? "rotate-90 text-accent-teal ring-2 ring-accent-teal ring-offset-2" : "hover:text-accent-teal",
          )}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Settings className="h-5 w-5 animate-spin-slow" />}
        </button>

        {isOpen && (
          <>
            {/* Backdrop for mobile */}
            <div
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-xs md:hidden"
              onClick={() => setIsOpen(false)}
            />

            <div className="absolute right-0 bottom-15 z-50 w-72 rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <div
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: activeAccentHex }}
                  />
                  <span className="text-xs font-bold tracking-wider text-gray-800 uppercase font-heading">
                    Design Configurator
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Sidebar background switcher */}
              <div className="border-b border-gray-100 py-3.5 text-center">
                <span className="text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
                  Sidebar Background
                </span>
                <div className="mt-2.5 flex items-center justify-center gap-3">
                  {sidebarOptions.map((opt) => {
                    const isSelected = sidebarTheme === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSidebarTheme(opt.id)}
                        title={opt.label}
                        aria-label={opt.label}
                        style={{ backgroundColor: opt.color }}
                        className={cn(
                          "relative flex h-6 w-6 items-center justify-center rounded-full transition-all duration-200 hover:scale-110",
                          opt.id === "white" && "border border-gray-300",
                          isSelected
                            ? "ring-2 ring-offset-2 shadow-sm scale-110"
                            : "opacity-80 hover:opacity-100",
                        )}
                      >
                        {isSelected && (
                          <Check
                            className={cn(
                              "h-3.5 w-3.5",
                              opt.id === "white" ? "text-gray-800" : "text-white",
                            )}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
                <span className="mt-1.5 block text-[10px] text-gray-400 font-medium">
                  {sidebarOptions.find((o) => o.id === sidebarTheme)?.label}
                </span>
              </div>

              {/* Accent Color switcher */}
              <div className="border-b border-gray-100 py-3.5 text-center">
                <span className="text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
                  Active Accent Color
                </span>
                <div className="mt-2.5 flex items-center justify-center gap-2.5">
                  {accentOptions.map((opt) => {
                    const isSelected = accentTheme === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setAccentTheme(opt.id)}
                        title={opt.label}
                        aria-label={opt.label}
                        style={{ backgroundColor: opt.color }}
                        className={cn(
                          "flex h-5 w-5 items-center justify-center rounded-full transition-all duration-200 hover:scale-110",
                          isSelected
                            ? "ring-2 ring-offset-2 ring-gray-400 shadow scale-110"
                            : "opacity-85 hover:opacity-100",
                        )}
                      >
                        {isSelected && <Check className="h-3 w-3 text-white drop-shadow" />}
                      </button>
                    );
                  })}
                </div>
                <span className="mt-1.5 block text-[10px] text-gray-400 font-medium">
                  {accentOptions.find((o) => o.id === accentTheme)?.label}
                </span>
              </div>

              {/* Quick Action Links */}
              <div className="space-y-2 pt-3">
                <a
                  href="/dashboard/shadcn"
                  className="flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-center text-xs font-bold tracking-wider text-white uppercase shadow transition duration-200 hover:opacity-95"
                  style={{ backgroundColor: activeAccentHex }}
                >
                  <HelpCircle className="h-3.5 w-3.5" />
                  Showcase UI Primitives
                </a>
                <a
                  href="https://demos.creative-tim.com/paper-dashboard-pro-react/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-gray-300 bg-white py-2 text-center text-xs font-semibold tracking-wider text-gray-700 uppercase transition duration-200 hover:border-gray-500 hover:bg-gray-50"
                >
                  <ExternalLink className="h-3.5 w-3.5 text-gray-500" />
                  Paper PRO Specs
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
