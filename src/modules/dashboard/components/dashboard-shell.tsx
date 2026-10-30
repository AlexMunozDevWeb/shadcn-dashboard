"use client";

import { useEffect, useState } from "react";
import DashboardBottomNav from "@/modules/dashboard/components/dashboard-bottom-nav";
import DashboardDrawer from "@/modules/dashboard/components/dashboard-drawer";
import DashboardFooter from "@/modules/dashboard/components/dashboard-footer";
import DashboardHeader from "@/modules/dashboard/components/dashboard-header";
import DashboardSidebar from "@/modules/dashboard/components/dashboard-sidebar";
import SettingsFab from "@/modules/dashboard/components/settings-fab";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!drawerOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDrawerOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [drawerOpen]);

  return (
    <div className="flex min-h-screen overflow-x-hidden bg-background">
      <DashboardSidebar />
      <DashboardDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto pb-16 md:pb-0">
        <DashboardHeader
          drawerOpen={drawerOpen}
          onToggleDrawer={() => setDrawerOpen((open) => !open)}
        />
        <main className="flex-1 space-y-8 p-4 sm:p-8">{children}</main>
        <DashboardFooter />
      </div>

      <DashboardBottomNav />
      <SettingsFab />
    </div>
  );
}
