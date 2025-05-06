"use client";
import React from "react";
import { GreenButton, RedButton } from "./buttonComp";
import { useSelector } from "react-redux";
import type { RootState } from "@/store-toolkit/reducers";
interface DrawerCompProps {
  drawerTitleName: string;
  saveButton?: () => void;
  closeButton?: () => void;
  children?: React.ReactNode;
}

function DrawerComp({
  drawerTitleName,
  saveButton,
  closeButton,
  children,
}: DrawerCompProps): JSX.Element {
  const { showDrawer } = useSelector((state: RootState) => state.ui);

  return (
    <div
      id="drawer-right-example"
      className={`fixed top-1 right-0 bottom-1 z-40 border border-l-grey-300 rounded-lg px-4 pt-10 overflow-y-auto bg-grey-500 lg:w-[34%] w-[80%] dark:bg-gray-800 transform transition-transform duration-500 ease-in-out ${
        showDrawer ? "translate-x-0 right-1" : "translate-x-full"
      }`}
      tabIndex={-1}
      aria-labelledby="drawer-right-label"
    >
      <h5
        id="drawer-right-label"
        className="inline-flex items-center mb-4 text-xl font-semibold text-grey-300 dark:text-gray-400"
      >
        {drawerTitleName}
      </h5>
      <button
        onClick={() => closeButton && closeButton()}
        type="button"
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
        <span className="sr-only">Close menu</span>
      </button>
      <div className="bg-white p-6 rounded-lg h-[80%] overflow-y-auto">{children}</div>
      <div className="flex absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white">
        <GreenButton text="Save" clickHandler={() => saveButton && saveButton()} />
        <RedButton text="Close" clickHandler={() => closeButton && closeButton()} />
      </div>
    </div>
  );
}

export default DrawerComp;
