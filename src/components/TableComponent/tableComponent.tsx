"use client";
import React from "react";
import Pagination from "../pagination";
import { DeleteIcon, EyeIcon } from "@/utils/icons";
import DateRangePicker from "./dateRangePicker";
import TableDropdown from "./tableDropdown";
import SearchBarByOption from "./searchBar";

interface TableComponentProps {
  tableName: string;
  pageName: string;
  tableData: { [key: string]: string | number | boolean | null }[];
  columns: { id: string; label: string }[];
  totalCount: number;
  currentPage: number;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
  optionArr: { id: string; label: string }[];
  status: string;
  setStatus: (status: string) => void;
  dateRange: Date[] | undefined;
  setDateRange: (dates: Date[]) => void;
  search: {
    searchBy: string;
    searchText: string;
  };
  setSearch: (text: string | { searchBy: string; searchText: string }) => void;
  searchHandler: () => void;
  specialColumnHandler?: (row: Record<string, string | number | boolean | null>) => void;
}

const TableComponent = ({
  tableName,
  pageName,
  tableData,
  columns,
  totalCount,
  dateRange,
  setDateRange,
  currentPage,
  itemsPerPage,
  setCurrentPage,
  setItemsPerPage,
  optionArr,
  status,
  setStatus,
  search,
  setSearch,
  searchHandler,
  specialColumnHandler,
}: TableComponentProps): JSX.Element => {
  const renderSpecialColumn = (
    columnId: string,
    item: Record<string, string | number | boolean | null>,
  ) => {
    switch (columnId) {
      case "edit":
        return <button className="text-blue-500 hover:underline">Edit</button>;
      case "view":
        return (
          <button
            onClick={() => specialColumnHandler && specialColumnHandler(item)}
            className="text-green-500 hover:underline"
          >
            <EyeIcon />
          </button>
        );
      case "delete":
        return (
          <button className="text-red-500 hover:underline" aria-label="Delete">
            <DeleteIcon />
          </button>
        );
      default:
        return <span>-</span>;
    }
  };

  return (
    <div className="mx-auto border rounded-lg border-gray-200 text-grey-500">
      <div className="bg-gray-100 relative shadow-md sm:rounded-lg overflow-hidden dark:bg-gray-500">
        <div className="p-4">
          <p className="text-lg dark:text-gray-100">{tableName}</p>
          <div className="mt-2 flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/2">
              <SearchBarByOption
                pageName={pageName}
                search={search}
                setSearch={(text) =>
                  setSearch(
                    typeof text === "string" ? { searchBy: "default", searchText: text } : text,
                  )
                }
                searchHandler={searchHandler}
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col md:flex-row lg:flex-row justify-end">
              <div className="w-full lg:w-fit">
                <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
              </div>
              <TableDropdown
                pageName={pageName}
                optionArr={optionArr}
                status={status}
                setStatus={setStatus}
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-center text-gray-700 bg-gray-300 dark:bg-gray-800 dark:text-gray-300">
              <tr>
                {columns.map((column) => (
                  <th key={column.id} className="px-4 py-2 border-r border-gray-200">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, i) => (
                <tr
                  key={typeof item.id === "string" || typeof item.id === "number" ? item.id : i}
                  className="bg-white text-center border-b dark:bg-gray-900 dark:border-gray-700"
                >
                  {columns.map((column) => {
                    const isSpecial = ["view", "edit", "delete"].includes(column.id);
                    return (
                      <td key={column.id} className="px-4 py-2 border-r border-gray-200">
                        {isSpecial ? renderSpecialColumn(column.id, item) : item[column.id]}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <nav className="p-4" aria-label="Table navigation">
          <Pagination
            totalCount={totalCount}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            setCurrentPage={setCurrentPage}
            setItemsPerPage={setItemsPerPage}
          />
        </nav>
      </div>
    </div>
  );
};

export default TableComponent;
