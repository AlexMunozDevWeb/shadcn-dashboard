"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  User,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const ROLES = ["Developer", "Designer", "Manager"] as const;

const registerSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required.")
    .min(2, "First name must have at least 2 characters."),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required.")
    .min(2, "Last name must have at least 2 characters."),
  email: z
    .string()
    .trim()
    .min(1, "Work email is required.")
    .email("Please enter a valid email address."),
  password: z
    .string()
    .min(1, "Password is required.")
    .min(8, "Password must have at least 8 characters."),
  role: z.enum(ROLES, {
    message: "Please select your primary role.",
  }),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms of service and privacy policy.",
  }),
});

type RegisterFormData = z.infer<typeof registerSchema>;

function calculatePasswordStrength(password: string): {
  score: number;
  label: string;
  colorClass: string;
} {
  if (!password || password.length === 0) {
    return { score: 0, label: "None", colorClass: "text-muted-foreground" };
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
  if (password.length >= 10 && /[^A-Za-z0-9]/.test(password)) {
    score++;
  }

  // Ensure minimum 1 when typing
  score = Math.max(1, score);

  if (score === 1) {
    return { score: 1, label: "Weak", colorClass: "text-destructive" };
  }
  if (score === 2) {
    return { score: 2, label: "Medium", colorClass: "text-accent-yellow" };
  }
  return { score: 3, label: "Strong", colorClass: "text-accent-mint" };
}

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
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

  const watchedPassword = watch("password") || "";
  const selectedRole = watch("role");
  const strength = calculatePasswordStrength(watchedPassword);

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    // Simulate brief network latency
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);

    toast.success("Account created successfully!", {
      description: `Welcome to Paper Dashboard PRO, ${data.firstName}!`,
    });

    setTimeout(() => {
      router.push("/dashboard");
    }, 1200);
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
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() =>
                toast.info("Google sign-up is in demonstration mode.")
              }
              className="group flex items-center justify-center gap-2 rounded-lg border border-border/60 bg-muted/60 px-3 py-2.5 font-heading text-xs font-semibold text-foreground transition-all duration-200 hover:border-primary/40 hover:bg-muted active:scale-[0.99]"
            >
              <svg
                className="size-4 shrink-0"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  fill="#EA4335"
                />
              </svg>
              <span className="transition-colors group-hover:text-primary">
                Google
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                toast.info("GitHub sign-up is in demonstration mode.")
              }
              className="group flex items-center justify-center gap-2 rounded-lg border border-border/60 bg-muted/60 px-3 py-2.5 font-heading text-xs font-semibold text-foreground transition-all duration-200 hover:border-primary/40 hover:bg-muted active:scale-[0.99]"
            >
              <svg
                className="size-4 shrink-0 fill-foreground transition-colors group-hover:fill-primary"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span className="transition-colors group-hover:text-primary">
                GitHub
              </span>
            </button>
          </div>

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
            className="space-y-4"
            noValidate
          >
            {/* First Name & Last Name */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label
                  htmlFor="first-name"
                  className="block font-heading text-xs font-bold tracking-wide uppercase text-foreground"
                >
                  First Name
                </Label>
                <div
                  className={`relative flex items-center rounded-lg border bg-card/60 shadow-xs transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 ${
                    errors.firstName
                      ? "border-destructive ring-1 ring-destructive/30"
                      : "border-input"
                  }`}
                >
                  <User className="ml-3.5 size-4 text-muted-foreground shrink-0" />
                  <input
                    {...register("firstName")}
                    id="first-name"
                    type="text"
                    placeholder="Eleanor"
                    className="w-full bg-transparent px-3 py-2.5 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-1 text-xs font-medium text-destructive">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="last-name"
                  className="block font-heading text-xs font-bold tracking-wide uppercase text-foreground"
                >
                  Last Name
                </Label>
                <div
                  className={`relative flex items-center rounded-lg border bg-card/60 shadow-xs transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 ${
                    errors.lastName
                      ? "border-destructive ring-1 ring-destructive/30"
                      : "border-input"
                  }`}
                >
                  <input
                    {...register("lastName")}
                    id="last-name"
                    type="text"
                    placeholder="Vance"
                    className="w-full bg-transparent px-3.5 py-2.5 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                </div>
                {errors.lastName && (
                  <p className="mt-1 text-xs font-medium text-destructive">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Work Email */}
            <div className="space-y-1.5">
              <Label
                htmlFor="work-email"
                className="block font-heading text-xs font-bold tracking-wide uppercase text-foreground"
              >
                Work Email
              </Label>
              <div
                className={`relative flex items-center rounded-lg border bg-card/60 shadow-xs transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 ${
                  errors.email
                    ? "border-destructive ring-1 ring-destructive/30"
                    : "border-input"
                }`}
              >
                <Mail className="ml-3.5 size-4 text-muted-foreground shrink-0" />
                <input
                  {...register("email")}
                  id="work-email"
                  type="email"
                  autoComplete="email"
                  placeholder="eleanor@company.design"
                  className="w-full bg-transparent px-3 py-2.5 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs font-medium text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label
                htmlFor="password"
                className="block font-heading text-xs font-bold tracking-wide uppercase text-foreground"
              >
                Password
              </Label>
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
                  autoComplete="new-password"
                  placeholder="••••••••••••"
                  className="w-full bg-transparent px-3 py-2.5 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="mr-3 text-muted-foreground transition-colors hover:text-foreground focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              <div className="mt-2 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-heading">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Password Strength
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
              {errors.password && (
                <p className="mt-1 text-xs font-medium text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Role / Workspace Selector */}
            <div className="space-y-1.5 pt-1">
              <Label className="block font-heading text-xs font-bold tracking-wide uppercase text-foreground">
                Your Role / Workspace
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {ROLES.map((role) => {
                  const isSelected = selectedRole === role;
                  return (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setValue("role", role)}
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
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toast.info("Terms of Service preview.");
                    }}
                    className="font-medium text-primary hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toast.info("Privacy Policy preview.");
                    }}
                    className="font-medium text-primary hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </Label>
              </div>
              {errors.terms && (
                <p className="text-xs font-medium text-destructive">
                  {errors.terms.message}
                </p>
              )}
            </div>

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
