import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/modules/auth/lib/auth";
import DashboardShell from "@/modules/dashboard/components/dashboard-shell";

export default async function ProtectedDashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/auth/login");

  return <DashboardShell>{children}</DashboardShell>;
}
