import React, { useState } from "react";
import { logout } from "@/store-toolkit/slices/auth/authSlice";
import { useAppDispatch } from "@/store-toolkit/hooks";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface NavbarProps {
  showHamburgerBtn?: boolean;
  hideSideBarFunc: () => void;
}

function Navbar({ showHamburgerBtn, hideSideBarFunc }: NavbarProps): JSX.Element {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    closeDropdown();
    await dispatch(logout());
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const routeHandler = () => {
    router.replace("/profile-settings/");
    closeDropdown();
  };

  return (
    <div className="flex">
      <div className="flex z-40 items-center justify-between px-3 py-1 lg:px-5 lg:pl-3 fixed w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-500 shadow-md">
        {/* {!hideSidebar && ( */}
        {showHamburgerBtn && (
          <button
            onClick={() => hideSideBarFunc()}
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6 text-primaryGreen"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              />
            </svg>
          </button>
        )}
        {/* )} */}

        <Link href="/dashboard" className="flex ms-2 md:me-24">
          <img
            src="https://s3.jp-tok.cloud-object-storage.appdomain.cloud/big-issue-main-bucket/GET_ENERGY/USER_AUTHORISED_SIGN/8bcc9a73-1c7e-4e5e-bb26-0eb596d662b7/intelligridLogo.png"
            className="h-14"
            alt="Logo"
          />
        </Link>

        <div className="flex items-center space-x-3">
          {/* <ThemeToggle /> */}
          <button
            className="relative flex items-center justify-center w-10 h-10 border border-gray-300 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-expanded={isDropdownOpen}
          >
            <svg
              className="w-6 h-6 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute top-16 right-2 mt-2 w-44 bg-white border shadow-lg rounded-lg dark:bg-gray-700 dark:border-gray-500">
              <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <p className="text-lg underline cursor-pointer font-bold" onClick={routeHandler}>
                  Bonnie Green
                </p>
                <p className="text-xs font-bold">name@flowbite.com</p>
                <p className="text-xs font-bold">
                  Hedera Id <span className="font-futura">0.0.2156854</span>{" "}
                </p>
              </div>
              <div>
                <button
                  onClick={handleLogout}
                  className="text-white text-xs rounded-b-lg w-full font-bold bg-orange-500 px-4 py-2 text-sm text-gray-700"
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
