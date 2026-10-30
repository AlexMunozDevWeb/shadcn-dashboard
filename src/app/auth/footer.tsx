import { uiText } from "@/modules/data/ui-text";

export default function AuthFooter() {
  return (
    <footer className="w-full border-t border-border/40 py-6">
      <div className="mx-auto flex max-w-7xl justify-center gap-4 px-6 text-xs text-muted-foreground sm:flex-row lg:px-8">
        <div>
          <span>{uiText.authFooter}</span>
        </div>
      </div>
    </footer>
  );
}
