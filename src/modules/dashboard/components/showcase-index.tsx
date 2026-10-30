"use client";

import { MouseEvent, useEffect, useState } from "react";
import { uiText } from "@/modules/data/ui-text";

export type ShowcaseIndexItem = {
  id: string;
  label: string;
};

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function ShowcaseIndex({
  items,
}: {
  items: ShowcaseIndexItem[];
}) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const sections = items
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const current = items.find(({ id }) => visible.has(id));
        if (current) setActiveId(current.id);
      },
      { rootMargin: "-96px 0px -60% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  function handleClick(event: MouseEvent<HTMLAnchorElement>, id: string) {
    const target = document.getElementById(id);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
    window.history.replaceState(null, "", `#${id}`);
    setActiveId(id);
  }

  return (
    <div className="contents">
      <nav
        aria-label={uiText.accessibility.componentIndex}
        className="mb-8 flex flex-wrap gap-1.5 lg:hidden"
      >
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={isActive ? "location" : undefined}
              onClick={(event) => handleClick(event, item.id)}
              className={
                isActive
                  ? "rounded-md border border-primary bg-primary/15 px-2.5 py-1 text-sm font-medium text-primary transition-colors"
                  : "rounded-md border border-border px-2.5 py-1 text-sm text-muted-foreground transition-colors hover:border-border hover:text-foreground"
              }
            >
              {item.label}
            </a>
          );
        })}
      </nav>

      <nav
        aria-label={uiText.accessibility.componentIndex}
        className="hidden lg:col-start-2 lg:row-start-1 lg:block"
      >
        <div className="sticky top-24">
          <p className="text-xs font-medium text-muted-foreground">
            On this page
          </p>
          <ul className="mt-3 space-y-1 border-l border-border pl-3">
            {items.map((item) => {
              const isActive = item.id === activeId;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "location" : undefined}
                    onClick={(event) => handleClick(event, item.id)}
                    className={
                      isActive
                        ? "block truncate rounded-sm py-0.5 text-sm font-medium text-primary"
                        : "block truncate rounded-sm py-0.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    }
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
}
