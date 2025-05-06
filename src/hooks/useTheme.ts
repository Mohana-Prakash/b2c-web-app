"use client";
import { useState, useEffect } from "react";

type Theme = "light" | "dark";

export const useTheme = (): {
  theme: Theme;
  toggleTheme: () => void;
  setLightTheme: () => void;
} => {
  const preferredTheme =
    typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  const [theme, setTheme] = useState<Theme>(
    typeof window !== "undefined"
      ? (localStorage.getItem("theme") as Theme) || preferredTheme
      : "light",
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = (): void => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const setLightTheme = (): void => {
    setTheme("light");
  };

  return { theme, toggleTheme, setLightTheme };
};
