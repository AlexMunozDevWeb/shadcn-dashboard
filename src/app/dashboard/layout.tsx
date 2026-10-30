import { Suspense } from "react";

import ProtectedDashboardShell from "./protected-shell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<DashboardLoadingFallback />}>
      <ProtectedDashboardShell>{children}</ProtectedDashboardShell>
    </Suspense>
  );
}

function DashboardLoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <p className="text-sm text-muted-foreground">Loading dashboard...</p>
    </div>
  );
}
