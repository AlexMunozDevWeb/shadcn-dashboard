"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import type { Control, UseFormRegisterReturn } from "react-hook-form";
import { useWatch } from "react-hook-form";
import { Label } from "@/modules/components//ui/label";
import type { RegisterFormData } from "../../../app/auth/register/schema";
import { uiText } from "@/modules/data/ui-text";

type RegisterPasswordFieldProps = {
  control: Control<RegisterFormData>;
  registration: UseFormRegisterReturn<"password">;
  error?: string;
};

function calculatePasswordStrength(password: string): {
  score: number;
  label: string;
  colorClass: string;
} {
  if (!password) {
    return {
      score: 0,
      label: uiText.auth.strengthNone,
      colorClass: "text-muted-foreground",
    };
  }

  let score = 0;
  if (password.length >= 6) score++;
  if (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password)
  ) {
    score++;
  }
  if (password.length >= 10 && /[^A-Za-z0-9]/.test(password)) score++;

  score = Math.max(1, score);

  if (score === 1) {
    return {
      score: 1,
      label: uiText.auth.strengthWeak,
      colorClass: "text-destructive",
    };
  }
  if (score === 2) {
    return {
      score: 2,
      label: uiText.auth.strengthMedium,
      colorClass: "text-accent-yellow",
    };
  }
  return {
    score: 3,
    label: uiText.auth.strengthStrong,
    colorClass: "text-accent-mint",
  };
}

export function RegisterPasswordField({
  control,
  registration,
  error,
}: RegisterPasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const password = useWatch({ control, name: "password" }) || "";
  const strength = calculatePasswordStrength(password);

  return (
    <div className="space-y-1.5">
      <Label
        htmlFor="password"
        className="block font-heading text-xs font-bold tracking-wide uppercase text-foreground"
      >
        {uiText.auth.password}
      </Label>
      <div
        className={`relative flex items-center rounded-lg border bg-card/60 shadow-xs transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 ${
          error
            ? "border-destructive ring-1 ring-destructive/30"
            : "border-input"
        }`}
      >
        <Lock className="ml-3.5 size-4 shrink-0 text-muted-foreground" />
        <input
          {...registration}
          id="password"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          placeholder={uiText.auth.registerPasswordPlaceholder}
          className="w-full bg-transparent px-3 py-2.5 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={
            showPassword
              ? uiText.accessibility.hidePassword
              : uiText.accessibility.showPassword
          }
          className="mr-3 text-muted-foreground transition-colors hover:text-foreground focus:outline-none"
        >
          {showPassword ? (
            <EyeOff className="size-4" />
          ) : (
            <Eye className="size-4" />
          )}
        </button>
      </div>

      <div className="mt-2 space-y-1.5">
        <div className="flex items-center justify-between text-xs font-heading">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {uiText.auth.passwordStrength}
          </span>
          <span
            className={`text-[11px] font-bold uppercase tracking-wider ${strength.colorClass}`}
          >
            {strength.label}
          </span>
        </div>
        <div className="grid h-1.5 w-full grid-cols-3 gap-1.5">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              strength.score >= 1
                ? strength.score === 1
                  ? "bg-destructive"
                  : strength.score === 2
                    ? "bg-accent-yellow"
                    : "bg-accent-mint"
                : "bg-muted"
            }`}
          />
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              strength.score >= 2
                ? strength.score === 2
                  ? "bg-accent-yellow"
                  : "bg-accent-mint"
                : "bg-muted"
            }`}
          />
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              strength.score >= 3 ? "bg-accent-mint" : "bg-muted"
            }`}
          />
        </div>
      </div>
      {error && (
        <p className="mt-1 text-xs font-medium text-destructive">{error}</p>
      )}
    </div>
  );
}
