"use client";

import { authClient } from "@/modules/lib/auth-client";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { uiText } from "@/modules/data/ui-text";

type SocialSignInButtonsProps = {
  action: "sign-in" | "sign-up";
};

export default function SocialSignInButtons({
  action,
}: SocialSignInButtonsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const actionLabel =
    action === "sign-up" ? uiText.auth.signUp : uiText.auth.login;

  const handleGoogleSignIn = async () => {
    await handleSocialSignIn("google");
  };

  const handleGithubSignIn = async () => {
    await handleSocialSignIn("github");
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    setIsLoading(true);
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: "/dashboard",
    });

    if (error) {
      setIsLoading(false);
      toast.error(
        `No se pudo ${action === "sign-up" ? "crear la cuenta" : "iniciar sesión"}.`,
        {
          description: error.message,
        },
      );
    }
  };

  return (
    <div className="mt-6 grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        aria-label={`${actionLabel} with ${uiText.auth.google}`}
        className="group flex items-center justify-center gap-2 rounded-lg border border-border/60 bg-muted/60 px-3 py-2.5 font-heading text-xs font-semibold text-foreground transition-all duration-200 hover:border-primary/40 hover:bg-muted active:scale-[0.99]"
      >
        <Image
          src="/google.svg"
          alt=""
          width={16}
          height={16}
          className="size-4 shrink-0"
          aria-hidden="true"
        />
        <span className="transition-colors group-hover:text-primary">
          {uiText.auth.google}
        </span>
      </button>

      <button
        type="button"
        onClick={handleGithubSignIn}
        disabled={isLoading}
        aria-label={`${actionLabel} with ${uiText.auth.github}`}
        className="group flex items-center justify-center gap-2 rounded-lg border border-border/60 bg-muted/60 px-3 py-2.5 font-heading text-xs font-semibold text-foreground transition-all duration-200 hover:border-primary/40 hover:bg-muted active:scale-[0.99]"
      >
        <span
          className="size-4 shrink-0 bg-foreground transition-colors group-hover:bg-primary [mask-image:url('/github.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
          aria-hidden="true"
        />
        <span className="transition-colors group-hover:text-primary">
          {uiText.auth.github}
        </span>
      </button>
    </div>
  );
}
