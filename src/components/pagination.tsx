"use client";
import React from "react";

interface PaginationProps {
  totalCount: number;
  currentPage: number;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
  paginationFile?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  totalCount,
  currentPage,
  itemsPerPage,
  setCurrentPage,
  setItemsPerPage,
  paginationFile,
}) => {
  const itemsPerPageOptions = [5, 10, 20, 50, 100];

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const newItemsPerPage = Number(event.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(0);
  };

  const handlePageChange = (direction: "next" | "previous"): void => {
    if (direction === "next") {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
    } else if (direction === "previous") {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
    }
  };

  const extraClass =
    paginationFile === "component" &&
    "absolute right-[2%] bottom-[2%] bg-orange-500 p-2 rounded text-white";

  return (
    <div className={`flex items-center justify-center lg:justify-end ${extraClass}`}>
      <div className="flex items-center">
        <label
          htmlFor="rows-per-page"
          className={`mr-2 text-sm text-gray-700 ${extraClass && "text-white"} dark:text-gray-300`}
        >
          Rows per page:
        </label>
        <select
          id="rows-per-page"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="p-1 text-sm border border-gray-300 dark:border-none rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary-500 focus:border-primary-500"
        >
          {itemsPerPageOptions.map((option) => (
            <option className="text-center" key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div
        className={`mx-4 text-sm text-gray-700 ${extraClass && "text-white"} dark:text-gray-300`}
      >
        {`${currentPage + 1}–${Math.ceil(totalCount / itemsPerPage)} of ${totalCount}`}
      </div>
      <div>
        <button
          onClick={() => handlePageChange("previous")}
          disabled={currentPage === 0}
          className="px-2 py-1 border border-gray-300 dark:border-none rounded mr-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-4"
          >
            <path
              fillRule="evenodd"
              d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          onClick={() => handlePageChange("next")}
          disabled={currentPage + 1 === Math.ceil(totalCount / itemsPerPage)}
          className="px-2 py-1 border border-gray-300 dark:border-none rounded ml-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-4"
          >
            <path
              fillRule="evenodd"
              d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
