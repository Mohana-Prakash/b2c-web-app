"use client";
import React from "react";

interface SearchBarByOptionProps {
  pageName: string;
  search: {
    searchBy: string;
    searchText: string;
  };
  setSearch: (search: { searchBy: string; searchText: string }) => void;
  searchHandler: () => void;
}

function SearchBarByOption({
  pageName,
  search,
  setSearch,
  searchHandler,
}: SearchBarByOptionProps): JSX.Element {
  function generateArrayForSearch(pageName: string): { id: string; label: string }[] | JSX.Element {
    switch (pageName) {
      case "payment":
        return [
          { id: "hedera_id", label: "Hedera ID" },
          { id: "customer_email", label: "Email" },
        ];
      case "hedera":
        return [{ id: "operation", label: "Operation" }];
      default:
        return <p>Invalid Column</p>;
    }
  }

  const searchByArr = generateArrayForSearch(pageName);

  return (
    <>
      <label className="block text-xs font-medium text-grey-400 dark:text-white">Search by</label>
      <div className="flex border border-gray-200 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 rounded">
        <select
          id="countries"
          className="text-white w-1/4 bg-orange-500 shadow-sm p-2 border-r border-gray-200 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-0 dark:bg-gray-700 rounded-l"
          onChange={(e) => setSearch({ searchBy: e.target.value, searchText: "" })}
        >
          <option className="bg-white text-grey-500" value="" disabled>
            Select
          </option>
          {Array.isArray(searchByArr) &&
            searchByArr.map((option: { id: string; label: string }) => (
              <option
                className="bg-white text-grey-500"
                key={String(option.id)}
                value={String(option.id)}
              >
                {option.label}
              </option>
            ))}
        </select>
        <div className="flex w-3/4">
          <input
            type="search"
            id="search-dropdown"
            className="block p-2 w-full z-20 text-sm text-gray-900 bg-gray-50 focus:outline-none focus:ring-blue-500 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
            placeholder="Search"
            value={search.searchText ?? ""}
            onChange={(e) =>
              setSearch({ searchBy: search.searchBy ?? "", searchText: e.target.value })
            }
          />
          <button
            type="submit"
            className="p-2 text-sm font-medium h-full text-white bg-orange-500 rounded-e border border-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={searchHandler}
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default SearchBarByOption;
