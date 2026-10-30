"use client";

import { useState } from "react";
import DashboardBottomNav from "@/modules/components/dashboard-bottom-nav";
import DashboardDrawer from "@/modules/components/dashboard-drawer";
import DashboardFooter from "@/modules/components/dashboard-footer";
import DashboardHeader from "@/modules/components/dashboard-header";
import DashboardSidebar from "@/modules/components/dashboard-sidebar";
import SettingsFab from "@/modules/components/settings-fab";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);

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
