"use client";

import { toast } from "sonner";
import Link from "next/link";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Eye,
  EyeOff,
  LayoutDashboard,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/modules/components/ui/button";
import { Checkbox } from "@/modules/components/ui/checkbox";
import { Label } from "@/modules/components/ui/label";
import { useState } from "react";
import { AuthTextField } from "@/modules/auth/components/auth-text-field";
import SocialSignInButtons from "@/modules/auth/components/social-sign-in-buttons";
import { authClient } from "@/modules/lib/auth-client";
import { uiText } from "@/modules/data/ui-text";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, uiText.auth.emailRequired)
    .email(uiText.auth.emailInvalid),
  password: z
    .string()
    .min(1, uiText.auth.passwordRequired)
    .min(6, uiText.auth.passwordMin),
  rememberMe: z.boolean(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: uiText.auth.emailPlaceholder,
      password: "",
      rememberMe: true,
    },
  });

  const onSubmit = async (dataForm: LoginFormData) => {
    setFormError(null);

    await authClient.signIn.email(
      {
        email: dataForm.email,
        password: dataForm.password,
        callbackURL: "/dashboard",
        rememberMe: dataForm.rememberMe,
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          setIsLoading(false);
          toast.success(uiText.auth.welcomeBack, {
            description: `Logged in as ${dataForm.email}`,
          });
        },
        onError: async (ctx) => {
          setIsLoading(false);

          if (ctx.error.status === 403) {
            setFormError(uiText.auth.emailUnverified);
            await authClient.sendVerificationEmail({
              email: dataForm.email,
              callbackURL: "/",
            });
            return;
          }

          setFormError(ctx.error.message || uiText.auth.loginFailed);
        },
      },
    );
  };

  return (
    <main className="relative flex flex-1 w-full flex-col items-center justify-center px-4 pt-28 pb-12 sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-20 size-96 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -bottom-24 size-96 rounded-full bg-accent-coral/15 blur-3xl"
      />

      {/* Center Card Container */}
      <div className="relative z-10 w-full max-w-md py-4">
        <div className="rounded-2xl border border-border/80 bg-card p-7 shadow-[0_12px_28px_-6px_rgba(0,0,0,0.08),0_4px_12px_-2px_rgba(0,0,0,0.04)] transition-all duration-300 sm:p-9 dark:shadow-paper">
          {/* Header / Brand Icon */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-3.5 flex size-14 items-center justify-center rounded-xl bg-primary/15 text-primary shadow-xs">
              <LayoutDashboard className="size-7" />
            </div>
            <span className="mb-1 font-heading text-[11px] font-bold tracking-widest uppercase text-primary">
              {uiText.brand.product}
            </span>
            <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-[26px]">
              {uiText.auth.loginTitle}
            </h1>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              {uiText.auth.loginSubtitle}
            </p>
          </div>

          {/* Social Logins */}
          <SocialSignInButtons action="sign-in" />

          {/* Separator */}
          <div className="relative my-6 flex items-center justify-center">
            <div className="h-px w-full bg-border/70" />
            <span className="absolute bg-card px-3 font-heading text-[11px] font-semibold tracking-wider uppercase text-muted-foreground">
              or with email
            </span>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            noValidate
          >
            {/* Email Address */}
            <AuthTextField
              label={uiText.auth.email}
              id="email"
              type="email"
              autoComplete="email"
              placeholder={uiText.auth.emailPlaceholder}
              registration={register("email")}
              error={errors.email?.message}
              icon={Mail}
            />

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="block font-heading text-xs font-bold tracking-wide uppercase text-foreground"
                >
                  {uiText.auth.password}
                </Label>
              </div>
              <div
                className={`relative flex items-center rounded-lg border bg-card/60 shadow-xs transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 ${
                  errors.password
                    ? "border-destructive ring-1 ring-destructive/30"
                    : "border-input"
                }`}
              >
                <Lock className="ml-3.5 size-4 text-muted-foreground shrink-0" />
                <input
                  {...register("password")}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder={uiText.auth.passwordPlaceholder}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
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
              {errors.password && (
                <p
                  id="password-error"
                  role="alert"
                  className="mt-1 text-xs font-medium text-destructive"
                >
                  {errors.password.message}
                </p>
              )}
            </div>

            {formError && (
              <p
                role="alert"
                className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
              >
                {formError}
              </p>
            )}

            {/* Options: Remember me & Forgot password */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <Controller
                  name="rememberMe"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="remember-me"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label
                  htmlFor="remember-me"
                  className="cursor-pointer select-none text-xs font-medium text-foreground sm:text-sm"
                >
                  {uiText.auth.rememberMe}
                </Label>
              </div>
              <Link
                href="/auth/login"
                onClick={(e) => {
                  e.preventDefault();
                  toast.info(uiText.auth.resetPasswordFeedback);
                }}
                className="font-heading text-xs font-semibold text-primary transition-colors hover:underline"
              >
                {uiText.auth.forgotPassword}
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="mt-4 h-11 w-full rounded-lg bg-primary font-heading text-xs font-bold tracking-wider uppercase text-primary-foreground shadow-[0_4px_12px_rgba(81,203,206,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/95 hover:shadow-[0_6px_16px_rgba(81,203,206,0.5)] active:translate-y-0 sm:text-sm"
            >
              {isLoading ? uiText.auth.signingIn : uiText.auth.login}
            </Button>
          </form>

          {/* Switch to Sign Up */}
          <div className="mt-6 text-center text-xs sm:text-sm text-muted-foreground">
            {uiText.auth.signUpQuestion}{" "}
            <Link
              href="/auth/register"
              className="font-semibold text-accent-coral transition-colors hover:underline ml-1"
            >
              {uiText.auth.signUp}
            </Link>
          </div>
        </div>

        {/* Security & System Trust Indicators */}
        <div className="mt-7 flex items-center justify-center gap-1.5 text-muted-foreground">
          <ShieldCheck className="size-4 text-accent-mint" />
          <span className="font-heading text-[11px] font-bold tracking-wider uppercase text-foreground/80">
            {uiText.auth.dashboardSecurity}
          </span>
        </div>

        <div className="mt-2 flex items-center justify-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-accent-mint animate-pulse" />
            <span>{uiText.auth.systemsOperational}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Lock className="size-3 text-muted-foreground" />
            <span>{uiText.auth.ssl}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
