"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
// import { getCookieData } from "../utils/helperFunc";
import { BackSlashIcon, HomeIcon } from "@/utils/icons";

const Breadcrumb = (): JSX.Element | null => {
  const pathname = usePathname();
  const router = useRouter();
  const pathArray = pathname?.split("/").filter((path) => path);

  const lastElement = pathArray.pop();

  const routeHandler = (path: string): void => {
    router.replace(path);
  };

  return (
    <nav className="font-bold flex bg-green-100 rounded-lg w-fit dark:bg-gray-800">
      <button className="flex items-center" onClick={() => routeHandler("/dashboard/")}>
        <HomeIcon /> <span className="text-xs ml-2">Home</span>
      </button>{" "}
      {pathArray.map((path) => {
        const name = path.replace(/-/g, " ").replace(/\b\w/g, (c) => c);
        return (
          <button
            key={path}
            onClick={() => routeHandler(`/${name}/`)}
            className="cursor-pointer focus:outline-none"
            style={{ marginLeft: "0px" }}
          >
            <p className="flex items-center text-sm text-green-500 dark:text-green-400">
              <BackSlashIcon /> <span className="text-xs">{name}</span>
            </p>
          </button>
        );
      })}
      <p
        className="m-0 flex items-center text-sm text-green-500 dark:text-green-400"
        style={{ marginLeft: "0px" }}
      >
        <BackSlashIcon /> <span className="text-xs">{lastElement}</span>
      </p>
    </nav>
  );
};

export default Breadcrumb;
