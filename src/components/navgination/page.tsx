import React, { type ReactNode } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store-toolkit/reducers";
import { setHideSideBar, setSizeSideBar } from "@/store-toolkit/slices/UI/uiSlice";

interface Props {
  children: ReactNode;
}

const NavLayout = ({ children }: Readonly<Props>): JSX.Element => {
  const dispatch = useDispatch();
  const { minimiseSidebar, hideSidebar } = useSelector((state: RootState) => state.ui);
  const hideSideBarFunc = () => dispatch(setHideSideBar(!hideSidebar));
  const adjustSideBarSize = () => dispatch(setSizeSideBar(!minimiseSidebar));

  return (
    <>
      <Navbar showHamburgerBtn={true} hideSideBarFunc={hideSideBarFunc} />
      <Sidebar adjustSideBarSize={adjustSideBarSize} hideSideBarFunc={hideSideBarFunc} />
      <div
        className={`pt-4 px-2  ${minimiseSidebar ? "sm:ml-64" : "lg:ml-12"} ${hideSidebar && "sm:ml-0"} transition-all duration-500 ease-in-out mt-16 sm:px-6 text-grey-500`}
      >
        {children}
      </div>
    </>
  );
};

export default NavLayout;
