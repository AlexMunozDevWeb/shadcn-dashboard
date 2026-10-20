import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const badgeVariants = cva(
  "group/badge inline-flex h-5.5 md:h-6 w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-full border px-2 sm:px-2.5 py-0.5 text-[11px] sm:text-xs md:text-xs font-semibold whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 font-heading tracking-wide",
  {
    variants: {
      variant: {
        default: "border-cyan-200 bg-cyan-50 text-accent-teal [a]:hover:bg-cyan-100",
        secondary:
          "border-gray-200 bg-gray-100 text-gray-700 [a]:hover:bg-gray-200",
        destructive:
          "border-orange-200 bg-orange-50 text-accent-coral [a]:hover:bg-orange-100",
        outline:
          "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost:
          "border-transparent hover:bg-muted hover:text-foreground",
        link: "border-transparent text-primary underline-offset-4 hover:underline",
        info: "border-sky-200 bg-sky-50 text-accent-blue [a]:hover:bg-sky-100",
        success: "border-emerald-200 bg-emerald-50 text-accent-mint [a]:hover:bg-emerald-100",
        warning: "border-amber-200 bg-amber-50 text-amber-700 [a]:hover:bg-amber-100",
        coral: "border-orange-200 bg-orange-50 text-accent-coral [a]:hover:bg-orange-100",
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
  }
)

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
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
