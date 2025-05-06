"use client";
import React, { useState, useEffect } from "react";
import TableComponent from "@/components/TableComponent/tableComponent";
import PageTitle from "@/components/headers/pageTitle";

type DataItem = Record<string, string | number | boolean | Record<string, unknown>>;

function HederaSummary(): JSX.Element {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [tranStatus, setTranStatus] = useState("ALL");
  const [paginatedData, setPaginatedData] = useState<DataItem[]>([]);
  const [dateRange, setDateRange] = useState<Date[]>([]);
  const [search, setSearch] = useState({
    searchBy: "",
    searchText: "",
  });
  const hederaSumArr = [
    { count: 0.0041, label: "Total Hedera fee ($)", image: "/hedera/hedera-hbar.png" },
    { count: 0.0246, label: "Total IHI fee ($)", image: "/hedera/hedera-hbar.png" },
    { count: 0.0205, label: "Total Profit fee ($)", image: "/hedera/profit.png" },
  ];

  const data: DataItem[] = [
    {
      user_id: "1a2b3c4d-5e6f-7890-abcd-1234567890ef",
      user_name: "Jane Doe",
      user_email: "mohan@ggexcel.ai",
      hedera_id: "0.0.345678",
      ihi_fee: 150.0,
      hedera_fee: 12.5,
      profit_fee: 87.7,
      created_at: "2025-04-20 14:32",
      hashscan_value: "1745293205.947880000",
      operation: "ConsensusSubmitMessage",
    },
    {
      user_id: "7g8h9i0j-1k2l-3456-mnop-7890123456qr",
      user_name: "John Smith",
      user_email: "ashok@ggexcel.ai",
      hedera_id: "0.0.112233",
      ihi_fee: 75.0,
      hedera_fee: 19.7,
      profit_fee: 57.9,
      created_at: "2025-04-18 10:12",
      hashscan_value: "1745289604.987919824",
      operation: "ConsensusSubmitMessage",
    },
    {
      user_id: "abc123de-4567-fghi-8910-jklmnopqrs45",
      user_name: "Emily Zhang",
      user_email: "ragul@ggexcel.ai",
      hedera_id: "0.0.998877",
      ihi_fee: 200.0,
      hedera_fee: 16.0,
      profit_fee: 45.3,
      created_at: "2025-04-19 16:45",
      hashscan_value: "1745286004.648540000",
      operation: "ConsensusSubmitMessage",
    },
  ];

  const tranStatusArr = [
    { id: "ALL", label: "All" },
    {
      id: "39c753c2-1f8e-4a14-a512-72ff882ed934",
      label: "HPIS@gmail.com",
    },
    {
      id: "2ee5d3aa-4b02-48df-ba79-55a040d6a64e",
      label: "vidullankaplc@gmail.com",
    },
  ];

  const columns = [
    { id: "created_at", label: "Transaction Date" },
    { id: "user_email", label: "User Email" },
    { id: "operation", label: "Operation" },
    { id: "hedera_id", label: "Hedera ID" },
    { id: "hedera_fee", label: "Hedera Fee ($)" },
    { id: "ihi_fee", label: "IHI Fee ($)" },
    { id: "profit_fee", label: "Profit ($)" },
    { id: "hashscan_value", label: "Transaction Details" },
  ];

  useEffect(() => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const newPaginatedData = data.slice(startIndex, endIndex);
    setPaginatedData(newPaginatedData);
  }, [currentPage, itemsPerPage]);

  const searchHandler = () => {
    // console.log(search);
  };

  const tableData = (
    DataArr: DataItem[],
  ): { [key: string]: string | number | boolean | null }[] => {
    let flattenedItem: { [key: string]: string | number | boolean | null };
    return DataArr.map((item) => {
      flattenedItem = {};
      Object.keys(item).forEach((key) => {
        const value = item[key];
        flattenedItem[key] =
          typeof value === "object" && value !== null ? JSON.stringify(value) : value;
      });
      return flattenedItem;
    });
  };

  return (
    <>
      <PageTitle heading="Hedera Summary" breadcrumb={true} />
      <div className="flex flex-wrap lg:flex-nowrap justify-around items-center mb-4 gap-4">
        {hederaSumArr.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-evenly lg:justify-center bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg w-full sm:w-1/20 md:w-1/3"
          >
            <dd className="rounded-t-lg p-1 text-center text-gray-700 bg-gray-300 w-full dark:text-gray-400 sm:text-sm text-xs">
              {item.label}
            </dd>
            <div className="py-2">
              <div className="w-20 m-auto md:w-28 lg:w-16 mt-3 lg:mt-0">
                <img className="w-full h-full rounded-lg" src={item.image} alt="hedera Summary" />
              </div>
              <div className="text-center ml-4 lg:ml-0">
                <dt className="text-orange-500 font-futura text-3xl font-extrabold">
                  {item.count}
                </dt>
              </div>
            </div>
          </div>
        ))}
      </div>
      <TableComponent
        tableName="Transactions"
        pageName="hedera"
        tableData={tableData(paginatedData)}
        columns={columns}
        totalCount={data.length}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
        setItemsPerPage={setItemsPerPage}
        dateRange={dateRange}
        setDateRange={setDateRange}
        search={search}
        setSearch={(value) =>
          setSearch(typeof value === "string" ? { ...search, searchText: value } : value)
        }
        searchHandler={searchHandler}
        optionArr={tranStatusArr}
        status={tranStatus}
        setStatus={setTranStatus}
      />
    </>
  );
}

export default HederaSummary;
