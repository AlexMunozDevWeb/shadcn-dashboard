import { LayoutDashboard, User } from "lucide-react";
import Link from "next/link";

export default function AuthHeader() {
  return (
    <header className="fixed top-0 left-0 z-40 w-full border-b border-border/40 bg-background/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href="/auth/login"
          className="group flex items-center gap-2.5 transition-transform hover:scale-[1.02]"
        >
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-[0_4px_8px_rgba(81,203,206,0.3)] transition-colors group-hover:bg-primary/90">
            <LayoutDashboard className="size-5" />
          </div>
          <span className="font-heading text-sm font-semibold tracking-wider uppercase text-foreground sm:text-base">
            Dashboard Admin <span className="font-bold text-primary">PRO</span>
          </span>
        </Link>

        {/* Right User Avatar Indicator */}
        <div className="flex items-center gap-3">
          <Link
            href="/auth/login"
            aria-label="User account"
            className="flex size-8 items-center justify-center rounded-full bg-primary/20 text-primary shadow-xs transition-transform hover:scale-105 active:scale-95 dark:bg-primary/30"
          >
            <User className="size-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
