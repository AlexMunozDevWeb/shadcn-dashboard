"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

export type SidebarTheme = "dark" | "slate" | "white";
export type AccentTheme = "teal" | "blue" | "mint" | "yellow" | "coral";

export const accentHexMap: Record<AccentTheme, string> = {
  teal: "#51cbce",
  blue: "#51bcda",
  mint: "#6bd098",
  yellow: "#fbc658",
  coral: "#ef8157",
};

export const sidebarThemeMap: Record<
  SidebarTheme,
  {
    bg: string;
    border: string;
    text: string;
    textMuted: string;
    activeBg: string;
    headerBorder: string;
    isDark: boolean;
  }
> = {
  dark: {
    bg: "#212120",
    border: "#2c2c2b",
    text: "#ffffff",
    textMuted: "#9a9a9a",
    activeBg: "rgba(255, 255, 255, 0.07)",
    headerBorder: "#333230",
    isDark: true,
  },
  slate: {
    bg: "#2b303a",
    border: "#393e4b",
    text: "#ffffff",
    textMuted: "#a0a8b8",
    activeBg: "rgba(255, 255, 255, 0.08)",
    headerBorder: "#3a404e",
    isDark: true,
  },
  white: {
    bg: "#ffffff",
    border: "#e3e1dc",
    text: "#252422",
    textMuted: "#767676",
    activeBg: "rgba(81, 203, 206, 0.10)",
    headerBorder: "#e3e1dc",
    isDark: false,
  },
};

type ThemeContextType = {
  sidebarTheme: SidebarTheme;
  setSidebarTheme: (theme: SidebarTheme) => void;
  accentTheme: AccentTheme;
  setAccentTheme: (accent: AccentTheme) => void;
  activeAccentHex: string;
  sidebarConfig: (typeof sidebarThemeMap)[SidebarTheme];
};

const ThemeContext = createContext<ThemeContextType>({
  sidebarTheme: "dark",
  setSidebarTheme: () => {},
  accentTheme: "teal",
  setAccentTheme: () => {},
  activeAccentHex: "#51cbce",
  sidebarConfig: sidebarThemeMap.dark,
});

function PaperThemeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resolvedTheme } = useTheme();
  const [sidebarTheme, setSidebarThemeState] = useState<SidebarTheme>("dark");
  const [accentTheme, setAccentThemeState] = useState<AccentTheme>("teal");

  useEffect(() => {
    try {
      const savedSidebar = localStorage.getItem(
        "paper_sidebar_theme",
      ) as SidebarTheme;
      const savedAccent = localStorage.getItem(
        "paper_accent_theme",
      ) as AccentTheme;
      if (savedSidebar && sidebarThemeMap[savedSidebar]) {
        // Restore persisted options after hydration to keep server markup stable.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSidebarThemeState(savedSidebar);
      }
      if (savedAccent && accentHexMap[savedAccent]) {
        setAccentThemeState(savedAccent);
      }
    } catch {
      // ignore
    }
  }, []);

  const setSidebarTheme = (theme: SidebarTheme) => {
    setSidebarThemeState(theme);
    try {
      localStorage.setItem("paper_sidebar_theme", theme);
    } catch {}
  };

  const setAccentTheme = (accent: AccentTheme) => {
    setAccentThemeState(accent);
    try {
      localStorage.setItem("paper_accent_theme", accent);
    } catch {}
  };

  const activeAccentHex = accentHexMap[accentTheme];
  const selectedSidebarConfig = sidebarThemeMap[sidebarTheme];
  const sidebarConfig = useMemo(
    () =>
      resolvedTheme === "dark" && sidebarTheme !== "white"
        ? {
            ...selectedSidebarConfig,
            bg: sidebarTheme === "dark" ? "#111416" : "#15191f",
            border: sidebarTheme === "dark" ? "#24292c" : "#262d37",
            headerBorder: sidebarTheme === "dark" ? "#24292c" : "#262d37",
          }
        : selectedSidebarConfig,
    [resolvedTheme, selectedSidebarConfig, sidebarTheme],
  );

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--primary", activeAccentHex);
    root.style.setProperty("--accent-primary", activeAccentHex);
    root.style.setProperty("--sidebar-bg", sidebarConfig.bg);
    root.style.setProperty("--sidebar-border", sidebarConfig.border);
    root.style.setProperty("--sidebar-text", sidebarConfig.text);
    root.style.setProperty("--sidebar-text-muted", sidebarConfig.textMuted);
    root.style.setProperty("--sidebar-active-bg", sidebarConfig.activeBg);
  }, [activeAccentHex, sidebarConfig]);

  return (
    <ThemeContext.Provider
      value={{
        sidebarTheme,
        setSidebarTheme,
        accentTheme,
        setAccentTheme,
        activeAccentHex,
        sidebarConfig,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      storageKey="paper_color_theme"
    >
      <PaperThemeContextProvider>{children}</PaperThemeContextProvider>
    </NextThemesProvider>
  );
}

export function usePaperTheme() {
  return useContext(ThemeContext);
}
