"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowRight, Mail, ShieldCheck, User, Zap } from "lucide-react";

import { Button } from "@/modules/components/ui/button";
import { Checkbox } from "@/modules/components/ui/checkbox";
import { Label } from "@/modules/components/ui/label";
import { AuthTextField } from "@/modules/auth/components/auth-text-field";
import { RegisterPasswordField } from "@/modules/auth/components/register-password-field";
import SocialSignInButtons from "@/modules/auth/components/social-sign-in-buttons";
import { ROLES, registerSchema } from "./schema";
import type { RegisterFormData } from "./schema";
import { authClient } from "@/modules/lib/auth-client";

export default function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "Developer",
      terms: true,
    },
  });

  const selectedRole = useWatch({ control, name: "role" });

  const onSubmit = async (dataForm: RegisterFormData) => {
    setFormError(null);

    await authClient.signUp.email(
      {
        email: dataForm.email,
        password: dataForm.password,
        name: `${dataForm.firstName} ${dataForm.lastName}`.trim(),
        callbackURL: "/dashboard",
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          setIsLoading(false);
          toast.success("Account created successfully!", {
            description: `Welcome to Paper Dashboard PRO, ${dataForm.firstName}!`,
          });
          router.push("/auth/login");
        },
        onError: (ctx) => {
          setIsLoading(false);
          setFormError(ctx.error.message || "No se pudo crear la cuenta.");
        },
      },
    );
  };

  return (
    <main className="relative flex flex-1 w-full flex-col items-center justify-center px-4 pt-28 pb-14 sm:px-6">
      {/* Subtle ambient blur lights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-20 size-96 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -bottom-24 size-96 rounded-full bg-accent-yellow/15 blur-3xl"
      />

      {/* Center Card Container */}
      <div className="relative z-10 w-full max-w-[540px] py-4">
        <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-paper transition-all duration-300 hover:shadow-paper-hover sm:p-9 dark:shadow-paper">
          {/* Header Badge & Title */}
          <div className="text-center">
            <span className="inline-block rounded-full bg-primary/15 px-3 py-1 font-heading text-[11px] font-bold tracking-wider uppercase text-primary">
              Get Started
            </span>
            <h1 className="mt-2 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-[28px]">
              Create an Account
            </h1>
            <p className="mx-auto mt-1 max-w-sm text-xs text-muted-foreground sm:text-sm">
              Join over 45,000+ developers and teams using Paper PRO.
            </p>
          </div>

          {/* Social Logins */}
          <SocialSignInButtons action="sign-up" />

          {/* Separator */}
          <div className="relative my-6 flex items-center justify-center">
            <div className="h-px w-full bg-border/70" />
            <span className="absolute bg-card px-3 font-heading text-[11px] font-semibold tracking-wider uppercase text-muted-foreground">
              or sign up with email
            </span>
          </div>

          {/* Register Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            // onSubmit={handleSubmit}
            className="space-y-4"
            noValidate
          >
            {/* First Name & Last Name */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <AuthTextField
                label="First Name"
                id="first-name"
                type="text"
                placeholder="Eleanor"
                registration={register("firstName")}
                error={errors.firstName?.message}
                icon={User}
              />
              <AuthTextField
                label="Last Name"
                id="last-name"
                type="text"
                placeholder="Vance"
                registration={register("lastName")}
                error={errors.lastName?.message}
              />
            </div>

            {/* Work Email */}
            <AuthTextField
              label="Work Email"
              id="work-email"
              type="email"
              autoComplete="email"
              placeholder="eleanor@company.design"
              registration={register("email")}
              error={errors.email?.message}
              icon={Mail}
            />

            {/* Password */}
            <RegisterPasswordField
              control={control}
              registration={register("password")}
              error={errors.password?.message}
            />

            {/* Role / Workspace Selector */}
            <div className="space-y-1.5 pt-1">
              <Label className="block font-heading text-xs font-bold tracking-wide uppercase text-foreground">
                Your Role / Workspace
              </Label>
              <div
                className="grid grid-cols-3 gap-2"
                role="group"
                aria-label="Your role or workspace"
              >
                {ROLES.map((role) => {
                  const isSelected = selectedRole === role;
                  return (
                    <button
                      key={role}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() =>
                        setValue("role", role, { shouldValidate: true })
                      }
                      className={`rounded-lg py-2 px-3 font-heading text-xs font-bold uppercase tracking-wider transition-all duration-200 active:scale-[0.98] ${
                        isSelected
                          ? "bg-primary text-primary-foreground shadow-xs"
                          : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {role}
                    </button>
                  );
                })}
              </div>
              {errors.role && (
                <p
                  role="alert"
                  className="text-xs font-medium text-destructive"
                >
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="space-y-1 pt-2">
              <div className="flex items-start gap-2.5">
                <Controller
                  name="terms"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="terms"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-0.5"
                    />
                  )}
                />
                <Label
                  htmlFor="terms"
                  className="cursor-pointer select-none text-xs leading-relaxed text-muted-foreground"
                >
                  I agree to the{" "}
                  <Link
                    href="/legal/terms"
                    className="font-medium text-primary hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/legal/privacy"
                    className="font-medium text-primary hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </Label>
              </div>
              {errors.terms && (
                <p
                  role="alert"
                  className="text-xs font-medium text-destructive"
                >
                  {errors.terms.message}
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

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="mt-4 h-11 w-full gap-2 rounded-lg bg-primary font-heading text-xs font-bold tracking-wider uppercase text-primary-foreground shadow-[0_4px_12px_rgba(81,203,206,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/95 hover:shadow-[0_6px_16px_rgba(81,203,206,0.5)] active:translate-y-0 sm:text-sm"
            >
              <span>
                {isLoading ? "Creating Account..." : "Create Account"}
              </span>
              <ArrowRight className="size-4" />
            </Button>
          </form>

          {/* Switch to Log In */}
          <div className="mt-6 border-t border-border/70 pt-4 text-center text-xs text-muted-foreground sm:text-sm">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-semibold text-primary transition-colors hover:underline ml-1"
            >
              Log in
            </Link>
          </div>
        </div>

        {/* Security & System Trust Indicators */}
        <div className="mt-7 flex items-center justify-center gap-6 text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="size-4 text-accent-mint" />
            <span className="font-heading text-[11px] font-bold tracking-wider uppercase text-foreground/80">
              256-bit SSL Secure
            </span>
          </div>
          <div className="size-1 rounded-full bg-muted-foreground/40" />
          <div className="flex items-center gap-1.5">
            <Zap className="size-4 text-accent-yellow" />
            <span className="font-heading text-[11px] font-bold tracking-wider uppercase text-foreground/80">
              Instant Deployment
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
