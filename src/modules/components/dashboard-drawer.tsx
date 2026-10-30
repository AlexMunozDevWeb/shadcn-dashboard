import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { cn } from "@/modules/lib/utils";
import { navItems } from "@/modules/components/sidebar-links";
import { usePaperTheme } from "./theme-provider";
import { uiText } from "@/modules/data/ui-text";

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
                              color: "var(--primary-foreground)",
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
            href={item.href ?? "/dashboard"}
            onClick={onClose}
            className={cn(
              "flex items-center space-x-3 rounded-lg px-3 py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors",
              active
                ? "text-white shadow-xs"
                : "text-gray-300 hover:bg-white/10 hover:text-white",
            )}
            style={
              active
                ? {
                    backgroundColor: activeAccentHex,
                    color: "var(--primary-foreground)",
                  }
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

export default function DashboardDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { activeAccentHex, sidebarConfig } = usePaperTheme();

  return (
    <div
      id="sidebar-drawer"
      className={cn(
        "pointer-events-none fixed inset-0 z-50 transition-opacity duration-300 lg:hidden",
        open ? "pointer-events-auto opacity-100" : "opacity-0",
      )}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label={uiText.accessibility.closeMenu}
        className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />
      <aside
        className={cn(
          "relative flex h-full w-72 max-w-[80vw] flex-col shadow-2xl transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
        aria-label={uiText.accessibility.navigation}
        inert={!open}
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
            <span
              className="font-heading text-xs font-bold tracking-wider uppercase"
              style={{ color: sidebarConfig.text }}
            >
              {uiText.brand.product}
            </span>
          </div>
          <button
            type="button"
            aria-label={uiText.accessibility.closeMenu}
            onClick={onClose}
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
              className="font-heading truncate text-xs font-bold"
              style={{ color: sidebarConfig.text }}
            >
              {uiText.dashboard.userName}
            </p>
            <span
              className="text-[10px] font-semibold tracking-wider uppercase"
              style={{ color: activeAccentHex }}
            >
              {uiText.dashboard.administrator}
            </span>
          </div>
        </div>

        <DrawerNav onClose={onClose} />
      </aside>
    </div>
  );
}
