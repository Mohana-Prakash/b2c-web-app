"use client";
import React from "react";
import "@/styles/globals.css";
import Image from "next/image";
import IntelligridLogo from "../../../public/intelligridLogo.png";
export default function AuthLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <section>
      <div className="w-full shadow-md sticky top-0 bg-white z-50 dark:bg-black">
        <div className="container flex justify-between items-center p-1">
          <Image style={{ height: "auto", width: "12rem" }} src={IntelligridLogo} alt="gif" />
        </div>
      </div>
      {/* <div className="flex flex-col h-screen"> */}
      <div className="flex-grow">{children}</div>
      <div className="w-full p-4 sticky bottom-0 bg-white z-50 shadow-t-md dark:bg-black">
        <div className="mx-auto flex justify-center items-center">
          <p className="text-s">&copy; copyrights by Intelligrid@2024</p>
          {/* <ThemeToggle /> */}
        </div>
      </div>
      {/* </div> */}
    </section>
  );
}
