import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

const badgeVariants = cva(
  "group/badge inline-flex h-5.5 md:h-6 w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-full border px-2 sm:px-2.5 py-0.5 text-[11px] sm:text-xs md:text-xs font-semibold whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 font-heading tracking-wide",
  {
    variants: {
      variant: {
        default:
          "border-cyan-200 bg-cyan-50 text-accent-teal dark:border-cyan-900 dark:bg-cyan-950 dark:text-cyan-300 [a]:hover:bg-cyan-100",
        secondary:
          "border-border bg-muted text-secondary-foreground [a]:hover:bg-muted/80",
        destructive:
          "border-orange-200 bg-orange-50 text-accent-coral dark:border-orange-900 dark:bg-orange-950 dark:text-orange-300 [a]:hover:bg-orange-100",
        outline:
          "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost: "border-transparent hover:bg-muted hover:text-foreground",
        link: "border-transparent text-primary underline-offset-4 hover:underline",
        info: "border-sky-200 bg-sky-50 text-accent-blue dark:border-sky-900 dark:bg-sky-950 dark:text-sky-300 [a]:hover:bg-sky-100",
        success:
          "border-emerald-200 bg-emerald-50 text-accent-mint dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 [a]:hover:bg-emerald-100",
        warning:
          "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300 [a]:hover:bg-amber-100",
        coral:
          "border-orange-200 bg-orange-50 text-accent-coral dark:border-orange-900 dark:bg-orange-950 dark:text-orange-300 [a]:hover:bg-orange-100",
      },
      capitalize: {
        true: "capitalize",
        false: "normal-case",
      },
    },
    defaultVariants: {
      capitalize: false,
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant = "default",
  capitalize = false,
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ capitalize, variant }), className),
      },
      props,
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  });
}

export { Badge, badgeVariants };
