"use client";
import React from "react";

interface TableDropdownComponentProps {
  pageName: string;
  optionArr: { [key: string]: string | number | boolean | null }[];
  status: string;
  setStatus: (status: string) => void;
}

const TableDropdown = ({
  pageName,
  optionArr,
  // status,
  setStatus,
}: TableDropdownComponentProps): JSX.Element => {
  function dropdownTitleName(pageName: string): string | JSX.Element {
    switch (pageName) {
      case "payment":
        return "Transaction Status";
      case "hedera":
        return "User List";
      default:
        return <p>Invalid Column</p>;
    }
  }

  return (
    <div className="flex flex-col w-full lg:w-1/3 ml-0 lg:ml-2 mt-2 lg:mt-0">
      <label className="block text-xs font-medium text-grey-400 dark:text-white">
        {dropdownTitleName(pageName)}
      </label>
      <select
        id="countries"
        className="text-grey-500 w-full border border-gray-200 bg-green-100 rounded shadow-sm p-2 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800"
        onChange={(e) => setStatus(e.target.value)}
      >
        {optionArr.map((option) => (
          <option key={String(option.id)} value={String(option.id)}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TableDropdown;
