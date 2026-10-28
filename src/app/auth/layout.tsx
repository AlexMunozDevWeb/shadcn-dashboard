import AuthHeader from "./header";
import AuthFooter from "./footer";
import SettingsFab from "@/components/settings-fab";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-background text-foreground selection:bg-primary/20">
      <AuthHeader />
      {children}
      <AuthFooter />
      <SettingsFab />
    </div>
  );
}
