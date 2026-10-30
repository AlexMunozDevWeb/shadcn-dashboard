export default function DashboardFooter() {
  return (
    <footer className="flex flex-col items-center justify-between gap-3 border-t border-border bg-transparent px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-8 md:text-sm">
      <div className="mb-2 flex items-center gap-6 sm:mb-0">
        {["Creative Tim", "Blog", "Licenses"].map((label) => (
          <a
            key={label}
            href="https://www.creative-tim.com"
            target="_blank"
            rel="noreferrer"
            className="font-heading text-[11px] font-semibold tracking-wider uppercase transition-colors hover:text-accent-teal sm:text-xs md:text-sm"
          >
            {label}
          </a>
        ))}
      </div>
      <div className="font-medium text-center text-[11px] text-muted-foreground sm:text-right sm:text-xs md:text-sm">
        © 2026, crafted with{" "}
        <span className="font-bold text-accent-coral" aria-hidden>
          ♥
        </span>{" "}
        by{" "}
        <span className="font-heading font-bold text-foreground">
          Creative Tim
        </span>{" "}
        &amp; Antigravity for a better web.
      </div>
    </footer>
  );
}
