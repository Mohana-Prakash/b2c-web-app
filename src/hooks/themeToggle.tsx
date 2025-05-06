"use client";

import { useState, useEffect } from "react";

const ThemeToggle = (): JSX.Element => {
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    } else {
      setTheme("light");
    }
  }, []);

  const toggleTheme = (): void => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
  };

  return (
    <div className="flex items-center">
      <label htmlFor="theme-toggle" className="inline-flex relative items-center cursor-pointer">
        <input
          type="checkbox"
          id="theme-toggle"
          style={{ display: "none" }}
          className="sr-only h-6"
          checked={theme === "dark"}
          onChange={toggleTheme}
        />
        <span className="flex items-center justify-center w-10 h-10 text-lg rounded-full border border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-700">
          {theme === "dark" ? "🌞" : "🌙"}
        </span>
        {/* <div className="w-12 h-6 bg-gray-200 rounded-full dark:bg-gray-600"></div>
        <span
          className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all ${
            theme === "dark" ? "transform translate-x-6" : ""
          }`}
        ></span> */}
      </label>
    </div>
  );
};
export default ThemeToggle;
