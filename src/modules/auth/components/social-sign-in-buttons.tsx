import { authClient } from "@/modules/lib/auth-client";
import Image from "next/image";

type SocialSignInButtonsProps = {
  action: "sign-in" | "sign-up";
};

export default function SocialSignInButtons({
  action,
}: SocialSignInButtonsProps) {
  const handleGoogleSignIn = async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
    console.log(JSON.stringify({ data, error }));
  };

  const handleGithubSignIn = async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
    });
    console.log(JSON.stringify({ data, error }));
  };

  return (
    <div className="mt-6 grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={handleGoogleSignIn}
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
          Google
        </span>
      </button>

      <button
        type="button"
        onClick={handleGithubSignIn}
        className="group flex items-center justify-center gap-2 rounded-lg border border-border/60 bg-muted/60 px-3 py-2.5 font-heading text-xs font-semibold text-foreground transition-all duration-200 hover:border-primary/40 hover:bg-muted active:scale-[0.99]"
      >
        <span
          className="size-4 shrink-0 bg-foreground transition-colors group-hover:bg-primary [mask-image:url('/github.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
          aria-hidden="true"
        />
        <span className="transition-colors group-hover:text-primary">
          GitHub
        </span>
      </button>
    </div>
  );
}
