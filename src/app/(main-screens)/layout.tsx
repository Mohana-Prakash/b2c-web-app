"use client";
import React, { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { RoleProvider } from "@/hooks/RoleContext";
import NavLayout from "@/components/navgination/page";
import Cookies from "js-cookie";
export default function MobileAdminLayout({
  children,
}: Readonly<{ children: ReactNode }>): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.replace("/auth/login");
    }
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
    document.documentElement.classList.remove("dark");
  }, [router]);

  return (
    <RoleProvider role={""}>
      <NavLayout>{children}</NavLayout>
    </RoleProvider>
  );
}
