"use client";
import React, { StrictMode, useEffect } from "react";
import "@/styles/globals.css";
import "@/styles/loading.css";
import { Provider } from "react-redux";
import { store } from "@/store-toolkit/store";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>): React.ReactNode {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.classList.add(savedTheme);
  }, []);
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css?family=Raleway&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
        <StrictMode>
          <Provider store={store}>{children}</Provider>
        </StrictMode>
        <Toaster position="top-center" reverseOrder={false} gutter={20} />
      </body>
    </html>
  );
}
