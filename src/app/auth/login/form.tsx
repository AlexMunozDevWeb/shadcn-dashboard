"use cliente";

import { toast } from "sonner";
import Link from "next/link";

import { useRouter } from "next/navigation";
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

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
  password: z
    .string()
    .min(1, "Password is required.")
    .min(6, "Password must have at least 6 characters."),
  rememberMe: z.boolean(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "name@example.com",
      password: "",
      rememberMe: true,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    // Simulate brief login delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);
    toast.success("Welcome back! Redirecting to Dashboard...", {
      description: `Logged in as ${data.email}`,
    });
    setTimeout(() => {
      router.push("/dashboard");
    }, 1200);
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
              Dashboard Admin PRO
            </span>
            <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-[26px]">
              Log in to your account
            </h1>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              Welcome back! Please enter your details.
            </p>
          </div>

          {/* Social Logins */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() =>
                toast.info("Google sign-in is in demonstration mode.")
              }
              className="group flex items-center justify-center gap-2 rounded-lg border border-border/60 bg-muted/60 px-3 py-2.5 text-xs font-semibold transition-all duration-200 hover:border-primary/40 hover:bg-muted font-heading text-foreground active:scale-[0.99]"
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
                toast.info("GitHub sign-in is in demonstration mode.")
              }
              className="group flex items-center justify-center gap-2 rounded-lg border border-border/60 bg-muted/60 px-3 py-2.5 text-xs font-semibold transition-all duration-200 hover:border-primary/40 hover:bg-muted font-heading text-foreground active:scale-[0.99]"
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
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="block font-heading text-xs font-bold tracking-wide uppercase text-foreground"
              >
                Email Address
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
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  className="w-full bg-transparent px-3 py-2.5 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-destructive mt-1 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="block font-heading text-xs font-bold tracking-wide uppercase text-foreground"
                >
                  Password
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
                  placeholder="••••••••"
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
              {errors.password && (
                <p className="text-xs text-destructive mt-1 font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>

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
                  Remember me
                </Label>
              </div>
              <Link
                href="/login"
                onClick={(e) => {
                  e.preventDefault();
                  toast.info(
                    "Password reset instructions will be sent to your email.",
                  );
                }}
                className="font-heading text-xs font-semibold text-primary transition-colors hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="mt-4 h-11 w-full rounded-lg bg-primary font-heading text-xs font-bold tracking-wider uppercase text-primary-foreground shadow-[0_4px_12px_rgba(81,203,206,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/95 hover:shadow-[0_6px_16px_rgba(81,203,206,0.5)] active:translate-y-0 sm:text-sm"
            >
              {isLoading ? "Signing In..." : "Let's Go • Sign In"}
            </Button>
          </form>

          {/* Switch to Sign Up */}
          <div className="mt-6 text-center text-xs sm:text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/dashboard/form"
              className="font-semibold text-accent-coral transition-colors hover:underline ml-1"
            >
              Sign up
            </Link>
          </div>
        </div>

        {/* Security & System Trust Indicators */}
        <div className="mt-7 flex items-center justify-center gap-1.5 text-muted-foreground">
          <ShieldCheck className="size-4 text-accent-mint" />
          <span className="font-heading text-[11px] font-bold tracking-wider uppercase text-foreground/80">
            Dashboard Admin PRO Enterprise Security
          </span>
        </div>

        <div className="mt-2 flex items-center justify-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-accent-mint animate-pulse" />
            <span>Systems 99.98% Operational</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Lock className="size-3 text-muted-foreground" />
            <span>256-bit SSL</span>
          </div>
        </div>
      </div>
    </main>
  );
}
