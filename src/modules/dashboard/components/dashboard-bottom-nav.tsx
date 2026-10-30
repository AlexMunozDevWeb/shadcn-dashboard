import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Gauge, Map, Plus, Settings } from "lucide-react";
import { cn } from "@/modules/lib/utils";
import { usePaperTheme } from "@/modules/components/theme-provider";
import { uiText } from "@/modules/data/ui-text";

const bottomTabs = [
  { name: uiText.navigation.dashboard, href: "/dashboard", icon: Gauge },
  {
    name: uiText.navigation.widgets,
    href: "/dashboard/shadcn",
    icon: BarChart3,
  },
  { name: uiText.navigation.components, href: "/dashboard/button", icon: Map },
  { name: uiText.navigation.settings, href: "/dashboard/card", icon: Settings },
];

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
        active
          ? "font-semibold"
          : "text-muted-foreground hover:text-foreground",
      )}
      style={active ? { color: accentColor } : undefined}
    >
      <tab.icon className="mb-0.5 h-4.5 w-4.5" />
      <span className="text-[10px] tracking-tight">{tab.name}</span>
    </Link>
  );
}

export default function DashboardBottomNav() {
  const pathname = usePathname();
  const { activeAccentHex } = usePaperTheme();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-background/95 px-4 py-2 shadow-bottom-nav backdrop-blur-md md:hidden">
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
            aria-label={uiText.dashboard.addTask}
            className="-mt-4 flex h-11 w-11 items-center justify-center rounded-full text-white shadow-lg transition duration-200 hover:scale-105 active:scale-95 dark:text-primary-foreground"
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
