"use client";

import type { ReactNode, ReactElement } from "react";
import { createContext, useContext } from "react";

const RoleContext = createContext<string | null>(null);

export function RoleProvider({
  role,
  children,
}: {
  role: string;
  children: ReactNode;
}): ReactElement {
  return <RoleContext.Provider value={role}>{children}</RoleContext.Provider>;
}

export function useRole(): string {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}
