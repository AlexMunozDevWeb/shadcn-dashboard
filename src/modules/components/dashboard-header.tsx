import { useRouter } from "next/navigation";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Search,
  Settings,
} from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/modules/components/ui/dropdown-menu";
import { authClient } from "../lib/auth-client";
import { usePaperTheme } from "./theme-provider";
import { uiText } from "@/modules/data/ui-text";

export default function DashboardHeader({
  drawerOpen,
  onToggleDrawer,
}: {
  drawerOpen: boolean;
  onToggleDrawer: () => void;
}) {
  const { activeAccentHex } = usePaperTheme();
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();
    if (error) {
      toast.error(uiText.dashboard.signOutError);
      return;
    }

    router.replace("/auth/login");
  };

  return (
    <header className="flex h-20 items-center justify-between border-b border-border bg-transparent px-4 sm:px-8">
      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label={uiText.accessibility.menu}
          aria-controls="sidebar-drawer"
          aria-expanded={drawerOpen}
          onClick={onToggleDrawer}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-card-foreground shadow-paper-sm transition duration-200 hover:scale-105 active:scale-95 lg:hidden"
        >
          <Menu className="h-4 w-4" />
        </button>
        <div>
          <h1 className="font-heading text-base font-bold tracking-tight text-foreground sm:text-xl md:text-2xl lg:text-2xl">
            {uiText.brand.product}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-5">
        <div className="relative hidden w-64 sm:block">
          <input
            type="search"
            placeholder={uiText.dashboard.search}
            aria-label={uiText.dashboard.search}
            className="h-9 w-full rounded-full border border-input bg-card pr-9 pl-4 text-xs text-foreground shadow-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2"
            style={{ outlineColor: activeAccentHex }}
          />
          <Search className="pointer-events-none absolute top-1/2 right-3.5 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        </div>

        <div className="flex items-center gap-2.5">
          <div className="relative">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-paper-sm transition duration-200 hover:scale-105"
              aria-label={uiText.accessibility.notifications}
            >
              <Bell className="h-4 w-4" />
            </button>
            <span className="absolute -top-0.5 right-0 h-2.5 w-2.5 rounded-full bg-accent-coral ring-2 ring-background" />
          </div>

          <button
            type="button"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-paper-sm transition duration-200 hover:scale-105 sm:flex"
            aria-label={uiText.accessibility.settings}
            onClick={() => {
              const fabBtn = document.querySelector(
                `aside button[aria-label="${uiText.settings.designSettings}"]`,
              ) as HTMLButtonElement;
              if (fabBtn) fabBtn.click();
            }}
          >
            <Settings className="h-4 w-4" />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger
              type="button"
              aria-label={uiText.accessibility.menuUser}
              className="items-center gap-2.5 border-l border-border pl-3 outline-none transition-opacity hover:opacity-80 focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring md:flex"
            >
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm"
                style={{ backgroundColor: activeAccentHex }}
              >
                CF
              </div>
              <div className="text-left">
                <span className="font-heading block text-xs leading-tight font-bold text-foreground md:text-sm">
                  {uiText.dashboard.administrator}
                </span>
              </div>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuLabel>
                  <span className="block font-semibold text-foreground">
                    {uiText.dashboard.userName}
                  </span>
                  <span className="text-xs font-normal text-muted-foreground">
                    {uiText.dashboard.administrator}
                  </span>
                </DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} variant="destructive">
                <LogOut aria-hidden="true" />
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
