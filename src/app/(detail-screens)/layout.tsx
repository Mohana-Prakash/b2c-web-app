"use client";
import React, { type ReactNode } from "react";
import { useDispatch } from "react-redux";
import { setHideSideBar } from "@/store-toolkit/slices/UI/uiSlice";
import Navbar from "@/components/navgination/navbar";

export default function MobileAdminLayout({
  children,
}: Readonly<{ children: ReactNode }>): JSX.Element {
  const dispatch = useDispatch();

  return (
    <>
      <Navbar showHamburgerBtn={false} hideSideBarFunc={() => dispatch(setHideSideBar(false))} />
      <div className="py-4 px-2 transition-all duration-500 ease-in-out mt-16 sm:px-6 text-grey-500">
        {children}
      </div>
    </>
  );
}
