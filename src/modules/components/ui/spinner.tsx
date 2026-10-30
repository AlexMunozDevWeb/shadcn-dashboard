import { cn } from "cn";
import { Loader2Icon } from "lucide-react";
import { uiText } from "@/modules/data/ui-text";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      data-slot="spinner"
      role="status"
      aria-label={uiText.accessibility.loading}
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
