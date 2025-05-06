"use client";
import React, { useState, useEffect } from "react";
import TableComponent from "@/components/TableComponent/tableComponent";
import PageTitle from "@/components/headers/pageTitle";
import { useRouter } from "next/navigation";
import { tranStatusArr } from "@/utils/constants";

type DataItem = Record<string, string | number | boolean | Record<string, unknown>>;

function PaymentSummary(): JSX.Element {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [tranStatus, setTranStatus] = useState("ALL");
  const [paginatedData, setPaginatedData] = useState<DataItem[]>([]);
  const [dateRange, setDateRange] = useState<Date[]>([]);
  const [search, setSearch] = useState({
    searchBy: "",
    searchText: "",
  });
  const tranSumArr = [
    { count: 45456, label: "Total Transactions", image: "/payment/transSum1.png" },
    { count: 12554, label: "Fulfilled Transactions", image: "/payment/transSum2.png" },
    { count: 65464, label: "Pending Transactions", image: "/payment/transSum3.png" },
    { count: 57555, label: "Failed Transactions", image: "/payment/transSum4.png" },
  ];

  const data: DataItem[] = [
    {
      id: "1a2b3c4d-5e6f-7890-abcd-1234567890ef",
      customer_name: "Jane Doe",
      customer_email: "jane.doe@example.com",
      hedera_id: "0.0.345678",
      amount_usd: 150.0,
      carbon_credits_purchased: 12.5,
      // stripe_payment_id: "pi_3N2x8GJ2eZvKYlo2Hg9L5E0F",
      stripe_payment_id: "pi_3N2...E0F",
      transaction_status: "FAILED",
      created_at: "2025-04-20 14:32",
      updated_at: "2025-04-20 14:32",
      metadata: {
        campaign: "EarthDay2025",
        referral_code: "ECO25",
      },
      receipt_url: "https://pay.stripe.com/receipts/acct_12345/rcpt_L9fN9h8XZABC",
      carbon_credit_type: "Renewable Energy",
    },
    {
      id: "7g8h9i0j-1k2l-3456-mnop-7890123456qr",
      customer_name: "John Smith",
      customer_email: "john.smith@example.com",
      hedera_id: "0.0.112233",
      amount_usd: 75.0,
      carbon_credits_purchased: 6.25,
      // stripe_payment_id: "pi_4Q9y3HJ4eZvKYlo2Rt8D1W9B",
      stripe_payment_id: "pi_3N2...E0F",
      transaction_status: "FULFILLED",
      created_at: "2025-04-18 10:12",
      updated_at: "2025-04-18 10:12",
      metadata: {
        campaign: "SpringClean2025",
        gift: true,
      },
      receipt_url: "https://pay.stripe.com/receipts/acct_67890/rcpt_P8kM7g6YQLMN",
      carbon_credit_type: "Forestry",
    },
    {
      id: "abc123de-4567-fghi-8910-jklmnopqrs45",
      customer_name: "Emily Zhang",
      customer_email: "emily.zhang@example.com",
      hedera_id: "0.0.998877",
      amount_usd: 200.0,
      carbon_credits_purchased: 16.0,
      // stripe_payment_id: "pi_5R1z6IJ8eZvKYlo2Zt3K8M4X",
      stripe_payment_id: "pi_3N2...E0F",
      transaction_status: "PENDING",
      created_at: "2025-04-19 16:45",
      updated_at: "2025-04-19 16:45",
      metadata: {
        campaign: "CorporateMatch",
        company: "GreenTech Inc.",
      },
      receipt_url: "https://pay.stripe.com/receipts/acct_56789/rcpt_T3fB1c2ZXYZA",
      carbon_credit_type: "Direct Air Capture",
    },
  ];

  const columns = [
    { id: "created_at", label: "Purchase Date" },
    { id: "customer_email", label: "Customer Email" },
    { id: "hedera_id", label: "Hedera ID" },
    { id: "amount_usd", label: "Amount (USD)" },
    { id: "carbon_credits_purchased", label: "Carbon Credits Purchased" },
    { id: "transaction_status", label: "Transaction Status" },
    { id: "stripe_payment_id", label: "Payment ID" },
    { id: "view", label: "View" },
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

  const goToPaymentDetails = () => {
    router.replace(`/payment-details?userId=${56456546}`);
  };

  return (
    <>
      <PageTitle heading="Payment Summary" breadcrumb={true} />
      <div className="flex flex-wrap lg:flex-nowrap justify-around items-center mb-4 gap-4">
        {tranSumArr.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-evenly lg:justify-center bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg w-full sm:w-1/20 md:w-1/4"
          >
            <dd className="rounded-t-lg p-1 text-center text-gray-700 bg-gray-300 w-full dark:text-gray-400 sm:text-sm text-xs">
              {item.label}
            </dd>
            <div className="py-2">
              <div className="w-20 m-auto md:w-28 lg:w-16 mt-3 lg:mt-0">
                <img
                  className="w-full h-full rounded-lg"
                  src={item.image}
                  alt="Transaction Summary"
                />
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
        pageName="payment"
        tableData={paginatedData.map((item) => {
          const flattenedItem: { [key: string]: string | number | boolean | null } = {};
          Object.keys(item).forEach((key) => {
            const value = item[key];
            flattenedItem[key] =
              typeof value === "object" && value !== null ? JSON.stringify(value) : value;
          });
          return flattenedItem;
        })}
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
        specialColumnHandler={goToPaymentDetails}
      />
    </>
  );
}

export default PaymentSummary;
