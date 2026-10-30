import { Suspense } from "react";

import ProtectedDashboardShell from "./protected-shell";
import { uiText } from "@/modules/data/ui-text";

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
      <p className="text-sm text-muted-foreground">
        {uiText.dashboard.loading}
      </p>
    </div>
  );
}
