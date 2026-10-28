import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/modules/lib/utils";

import { ThemeProvider } from "@/modules/components/theme-provider";
import { Toaster as SonnerToaster } from "@/modules/components/ui/sonner";
import { Toaster } from "@/modules/components/ui/toast";

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

const fontMontserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Dashboard Admin PRO - Creative Tim Replica",
  description:
    "Dashboard Admin PRO replica built with Next.js, Tailwind CSS and shadcn/ui.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={cn(
          fontInter.variable,
          fontMontserrat.variable,
          "min-h-screen bg-background text-foreground antialiased selection:bg-accent-teal/20 selection:text-foreground",
        )}
      >
        <ThemeProvider>
          {children}
          <SonnerToaster richColors />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
