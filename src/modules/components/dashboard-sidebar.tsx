import { CheckCircle2, ChevronDown } from "lucide-react";
import SidebarLinks from "@/modules/components/sidebar-links";
import { usePaperTheme } from "./theme-provider";

export default function DashboardSidebar() {
  const { activeAccentHex, sidebarConfig } = usePaperTheme();

  return (
    <aside
      className="z-30 hidden min-h-screen w-64 flex-shrink-0 flex-col justify-between shadow-xl transition-all duration-300 lg:flex"
      style={{
        backgroundColor: sidebarConfig.bg,
        borderRight: `1px solid ${sidebarConfig.border}`,
        color: sidebarConfig.text,
      }}
    >
      <div>
        <div
          className="flex flex-col items-center gap-1 border-b px-6 py-5"
          style={{ borderColor: sidebarConfig.border }}
        >
          <span
            className="font-heading block text-sm font-bold tracking-wider uppercase"
            style={{ color: sidebarConfig.text }}
          >
            Dashboard Admin
          </span>
          <span
            className="block text-[11px] font-medium tracking-tight"
            style={{ color: sidebarConfig.textMuted }}
          >
            Next.js
          </span>
        </div>

        <div
          className="flex items-center justify-between border-b px-6 py-4"
          style={{ borderColor: sidebarConfig.border }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm ring-2 ring-offset-1 ring-offset-background dark:text-primary-foreground"
              style={{ backgroundColor: activeAccentHex }}
            >
              CF
            </div>
            <div>
              <h4
                className="font-heading cursor-pointer text-xs font-bold tracking-wide transition-colors"
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

        <SidebarLinks />
      </div>

      <div
        className="border-t p-4 text-center"
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
  );
}
