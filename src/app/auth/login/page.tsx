"use client";

import LoginHeader from "./header";
import LoginFooter from "./footer";
import LoginForm from "./form";
import SettingsFab from "@/components/settings-fab";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-background text-foreground selection:bg-primary/20">
      <LoginHeader />
      <LoginForm />
      <LoginFooter />
      <SettingsFab />
    </div>
  );
}
