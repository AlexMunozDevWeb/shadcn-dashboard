import type { LucideIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import type { UseFormRegisterReturn } from "react-hook-form";

type AuthTextFieldProps = {
  label: string;
  id: string;
  type: "text" | "email";
  placeholder: string;
  registration: UseFormRegisterReturn;
  error?: string;
  icon?: LucideIcon;
  autoComplete?: string;
};

export function AuthTextField({
  label,
  id,
  type,
  placeholder,
  registration,
  error,
  icon: Icon,
  autoComplete,
}: AuthTextFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label
        htmlFor={id}
        className="block font-heading text-xs font-bold tracking-wide uppercase text-foreground"
      >
        {label}
      </Label>
      <div
        className={`relative flex items-center rounded-lg border bg-card/60 shadow-xs transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 ${
          error
            ? "border-destructive ring-1 ring-destructive/30"
            : "border-input"
        }`}
      >
        {Icon && (
          <Icon className="ml-3.5 size-4 shrink-0 text-muted-foreground" />
        )}
        <input
          {...registration}
          id={id}
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={`w-full bg-transparent py-2.5 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none ${
            Icon ? "px-3" : "px-3.5"
          }`}
        />
      </div>
      {error && (
        <p className="mt-1 text-xs font-medium text-destructive">{error}</p>
      )}
    </div>
  );
}
