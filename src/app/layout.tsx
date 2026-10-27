import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toast";

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
  title: "Paper Dashboard PRO React - Creative Tim Replica",
  description:
    "Paper Dashboard PRO React replica built with Next.js, Tailwind CSS and shadcn/ui.",
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
