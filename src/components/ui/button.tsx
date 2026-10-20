import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-xs sm:text-sm md:text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-200 outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 font-heading",
  {
    variants: {
      capitalize: {
        true: "capitalize",
        false: "normal-case",
      },
      variant: {
        default: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:-translate-y-0.5 active:translate-y-0",
        outline:
          "border-border bg-white text-gray-700 shadow-xs hover:border-primary hover:text-primary hover:-translate-y-0.5 active:translate-y-0 dark:border-input dark:bg-input/30",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[#dedcd6] hover:-translate-y-0.5 active:translate-y-0 shadow-xs",
        ghost:
          "hover:bg-muted hover:text-foreground active:translate-y-px",
        destructive:
          "bg-destructive text-white shadow-sm hover:bg-destructive/90 hover:-translate-y-0.5 active:translate-y-0",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-accent-mint text-white shadow-sm hover:bg-emerald-600 hover:-translate-y-0.5 active:translate-y-0",
        warning: "bg-accent-yellow text-white shadow-sm hover:bg-amber-500 hover:-translate-y-0.5 active:translate-y-0",
        info: "bg-accent-blue text-white shadow-sm hover:bg-cyan-600 hover:-translate-y-0.5 active:translate-y-0",
        coral: "bg-accent-coral text-white shadow-sm hover:bg-orange-600 hover:-translate-y-0.5 active:translate-y-0",
        paper: "bg-white text-gray-800 shadow-paper border border-gray-100 hover:shadow-paper-hover hover:-translate-y-0.5 active:translate-y-0",
      },
      size: {
        default:
          "h-8 sm:h-9 md:h-9.5 gap-1.5 px-3 sm:px-4 text-xs sm:text-sm md:text-sm has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),8px)] px-2 text-[10px] sm:text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 sm:h-8 gap-1.5 rounded-[min(var(--radius-md),10px)] px-2.5 sm:px-3 text-[11px] sm:text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9.5 sm:h-10 md:h-11 gap-2 px-4 sm:px-5 text-sm sm:text-base md:text-base has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "size-8 sm:size-9 md:size-9.5",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),8px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 sm:size-8 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9.5 sm:size-10 md:size-11",
      },
    },
    defaultVariants: {
      capitalize: true,
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  capitalize = true,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ capitalize, variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
