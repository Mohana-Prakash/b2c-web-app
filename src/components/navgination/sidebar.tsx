import type { ReactNode } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import {
  BadgeIcon,
  CalcIcon,
  CallIcon,
  DashIcon,
  HederaIcon,
  LeaderBoardIcon,
  MediaIcon,
  PaymentIcon,
  ProfileIcon,
  FAQIcon,
  UserPlusIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "../../utils/icons";
import type { RootState } from "@/store-toolkit/reducers";
import { setDrawer } from "@/store-toolkit/slices/UI/uiSlice";

interface MenuItem {
  route?: string;
  submenuArr?: { name: string; route: string }[];
  menus?: { name: string; route: string; icon?: ReactNode }[];
  icon?: ReactNode;
  category?: string;
}
interface SidebarProps {
  adjustSideBarSize: () => void;
  hideSideBarFunc: () => void;
}

function Sidebar({ adjustSideBarSize, hideSideBarFunc }: SidebarProps): JSX.Element {
  const currentPath = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const { minimiseSidebar, hideSidebar } = useSelector((state: RootState) => state.ui);

  const menuArr: MenuItem[] = [
    {
      category: "General",
      menus: [
        { name: "Dashboard Analytics", route: "/dashboard/", icon: <DashIcon /> },
        { name: "User List", route: "/user-list/", icon: <UserPlusIcon /> },
        { name: "Invite Operation Manager", route: "/invite-admin/", icon: <UserPlusIcon /> },
        { name: "Hedera Transactions", route: "/hedera-summary/", icon: <HederaIcon /> },
        { name: "Payment Summary", route: "/payment-summary/", icon: <PaymentIcon /> },
        { name: "CO2 Calculator", route: "/carbon-calculation/", icon: <CalcIcon /> },
        { name: "User Leaderboard", route: "/user-leaderboard/", icon: <LeaderBoardIcon /> },
        { name: "Badges Management", route: "/badge/", icon: <BadgeIcon /> },
      ],
    },
    {
      category: "Support",
      menus: [
        { name: "FAQs", route: "/FAQs/", icon: <FAQIcon /> },
        { name: "Tutorial Videos", route: "/tutorial-library/", icon: <MediaIcon /> },
        { name: "Customer Support", route: "/customer-support/", icon: <CallIcon /> },
      ],
    },
    {
      category: "Account Settings",
      menus: [{ name: "Profile Settings", route: "/profile-settings/", icon: <ProfileIcon /> }],
    },
  ];

  const routeHandler = (path: string) => {
    router.replace(path);
    hideSideBarFunc();
    dispatch(setDrawer(false));
  };

  return (
    <aside
      className={`fixed top-20 pb-3 bg-grey-500 lg:top-20 z-40 ${minimiseSidebar ? "w-64" : "w-12"} h-[calc(100vh-88px)] border border-gray-200 dark:bg-gray-800 dark:border-gray-500 rounded-lg sm:translate-x-0 sm:left-2 transform transition-all duration-500 ease-in-out flex flex-col ${hideSidebar ? "-translate-x-full" : "translate-x-0 left-2"}`}
      aria-label="Sidebar"
    >
      <div
        className={`border-b border-gray-600 text-white w-full h-8 flex ${minimiseSidebar ? "justify-end" : "justify-center"}`}
      >
        <button
          onClick={() => adjustSideBarSize()}
          className="text-white hover:text-grey-300 dark:hover:bg-gray-700 rounded-lg p-1 focus:outline-none"
        >
          {minimiseSidebar ? <ArrowLeftIcon /> : <ArrowRightIcon />}
        </button>
      </div>

      <div className={`flex-1 pl-0 ${minimiseSidebar && "pr-3"} pb-3 overflow-y-auto`}>
        <ul>
          {menuArr.map((menuItem) => (
            <div className={`${minimiseSidebar && "mt-3"}`} key={menuItem.category}>
              {minimiseSidebar && (
                <p className="text-xs text-grey-300 ml-3 font-semibold">{menuItem.category}</p>
              )}
              {menuItem?.menus?.map((menu) => (
                <li key={menu.name} className="mt-1">
                  <button
                    type="button"
                    className={`flex items-center focus:outline-none w-full pl-3 py-2 ${minimiseSidebar && "rounded-r-lg"} group ${
                      currentPath === menu.route
                        ? "bg-orange-500 text-white dark:bg-gray-500 dark:text-green-300"
                        : "text-grey-300 hover:text-white dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => menu.route && routeHandler(menu.route)}
                  >
                    <span>{menu.icon}</span>
                    {minimiseSidebar && <span className="text-sm ml-3">{menu.name}</span>}
                  </button>
                  {/* {menuItem.submenuArr && (
                      <ul
                        className={space-y-2 overflow-hidden transition-all ${
                          currentPath === menuItem.route
                            ? "max-h-screen opacity-100"
                            : "max-h-0 opacity-0"
                        }}
                      >
                        {menuItem.submenuArr.map((submenu) => (
                          <li key={submenu.name}>
                            <button
                              onClick={() => routeHandler(submenu.route)}
                              className={block px-6 py-2 text-sm rounded-r-lg ${
                                currentPath === submenu.route
                                  ? "bg-green-100 text-green-500 font-bold dark:bg-gray-500 dark:text-green-300"
                                  : "text-white hover:bg-green-500 dark:text-gray-300 dark:hover:bg-gray-700"
                              }}
                            >
                              {submenu.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )} */}
                </li>
              ))}
            </div>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
