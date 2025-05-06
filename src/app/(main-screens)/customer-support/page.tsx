"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PageTitle from "@/components/headers/pageTitle";
import { cusSupCategories, cusSupStatus, orange500 } from "@/utils/constants";
import Input from "@/components/FormComponent/input";
import axiosInstance from "@/store-toolkit/slices/auth/axiosInstance";
import { API_ENDPOINTS } from "@/utils/apiEndpoints";
import { getRelativeTime, successToast } from "@/utils/helperFunc";
import Pagination from "@/components/pagination";
import type { ApiResponse, FaqItem } from "@/utils/types";
import { setLoading } from "@/store-toolkit/slices/UI/uiSlice";
import NoRecords from "@/components/NoRecords";
import { supportQueries } from "@/utils/sampleData";
import Modal from "@/components/modal";
import { GreenButton, RedButton } from "@/components/buttonComp";
import { EditIcon } from "@/utils/icons";

function CustomerSupport(): JSX.Element {
  const dispatch = useDispatch();
  const [category, setCategory] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [queryStatus, setQueryStatus] = useState<string>("PENDING");
  // const [queryData, setQueryData] = useState<ApiResponse<unknown[]>>();
  const [selectedItem, setSelectedItem] = useState<FaqItem | null>(null);
  const [statusModal, setStatusModal] = useState<boolean>(false);
  const [updateStatus, setUpdateStatus] = useState("");

  const fetchData = useCallback(async () => {
    // dispatch(setLoading(true));
    // try {
    //   const res = await axiosInstance.get<ApiResponse<FaqItem[]>>(
    //     API_ENDPOINTS.GET_FAQ_LIST_BY_STATUS(
    //       currentPage,
    //       itemsPerPage,
    //       queryStatus ? "ACTIVE" : "IN_ACTIVE",
    //       category,
    //     ),
    //   );
    //   const { data, status } = extractResponse(res);
    //   if (status === 200) {
    //     setQueryData(data);
    //   }
    // } catch (err) {
    //   if ((err as { handled?: boolean })?.handled) {
    //     return;
    //   }
    // } finally {
    //   dispatch(setLoading(false));
    // }
  }, [currentPage, itemsPerPage, queryStatus, category, dispatch]);

  useEffect(() => {
    // fetchData();
  }, [fetchData]);

  const statusUpdateHandler = (): void => {
    // setSelectedItem(item);
    setStatusModal(true);
  };

  const updateQueryHandler = async () => {
    // if (!faqForm?.faqCategory || !faqForm?.question || !faqForm?.answer) {
    //   errorToast("Please fill all fields");
    //   return;
    // }
    const req_body = {};
    const endpoint = API_ENDPOINTS.UPDATE_FAQ(Number(selectedItem?.faqId) || 0);
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.post<ApiResponse<unknown[]>>(endpoint, req_body);
      if (res?.status === 200) {
        successToast(res?.data?.message);
        fetchData();
      }
    } catch (err) {
      if ((err as { handled?: boolean })?.handled) {
        return;
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  const drawerCloseHandler = () => {
    setStatusModal(false);
    setSelectedItem(null);
  };

  return (
    <>
      <PageTitle heading="Customer Support" breadcrumb={true} />
      <div className="flex justify-end mb-2">
        <Input
          label="Choose Status"
          type="select"
          name="category"
          value={queryStatus}
          onChange={(e) => setQueryStatus(e.target.value)}
          options={cusSupStatus.map((item) => ({ label: item.label, value: item.value }))}
        />
      </div>
      <div className="flex lg:flex-row flex-col lg:flex-row justify-between gap-4 mb-2">
        <div className="hidden md:block w-1/6">
          <ul className="text-gray-700 dark:text-gray-200">
            {cusSupCategories.map((e) => (
              <button
                key={e.label}
                className={`w-full mt-2 text-start focus:outline-none text-xs ${category === e.value ? "text-orange-500 font-semibold underline" : "text-grey-500"}`}
                onClick={() => setCategory(e.value)}
              >
                <span className="ml-1"> {e.label}</span>
              </button>
            ))}
          </ul>
          {/* <div className="flex text-orange-500 items-center mt-2 text-xs border border-orange-500 rounded p-1 w-fit">
            <button
              className="flex items-center"
              onClick={() => faqFormModeHandler({ mode: "add", item: null })}
            >
              <PlusIcon /> <span className="ml-2">Add FAQs</span>
            </button>
          </div> */}
        </div>
        <div className="block md:hidden">
          <Input
            label="Choose Category"
            type="select"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={cusSupCategories.map((item) => ({ label: item.label, value: item.value }))}
          />
        </div>
        <div className="p-1 w-full lg:w-5/6 h-fit xl:h-[70vh] overflow-y-scroll">
          {Number(supportQueries?.length) > 0 ? (
            supportQueries.map((item) => (
              <div
                key={item.id}
                className="mb-4 flex flex-col md:flex-row md:justify-between md:items-center shadow-md p-3"
              >
                <div>
                  <div className="text-base font-medium text-grey-500">{item.query}</div>
                  <div className="text-sm text-grey-400">
                    {item.email} {getRelativeTime(item.date)}
                  </div>
                </div>
                <button
                  className="text-sm text-gray-500 mt-2 md:mt-0"
                  onClick={() => statusUpdateHandler()}
                >
                  <EditIcon color={orange500} />
                </button>
              </div>
            ))
          ) : (
            <NoRecords
              title="No records found"
              subTitle="There’s nothing here yet. Please add new items."
            />
          )}
        </div>
      </div>
      {Number(supportQueries?.length) > 0 && (
        <Pagination
          totalCount={Number(supportQueries?.length)}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          setItemsPerPage={setItemsPerPage}
          paginationFile={"component"}
        />
      )}
      {statusModal && (
        <Modal title="Update Query Status" open={statusModal}>
          <div>
            <p className="text-center">Are you sure you want to change the status</p>
            <div className="my-4 w-1/2 mx-auto">
              <Input
                label="Choose Status"
                type="select"
                name="category"
                value={updateStatus}
                onChange={(e) => setUpdateStatus(e.target.value)}
                options={cusSupStatus.map((item) => ({ label: item.label, value: item.value }))}
              />
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <GreenButton clickHandler={updateQueryHandler} text="Update" />
            <RedButton clickHandler={drawerCloseHandler} text="Close" />
          </div>
        </Modal>
      )}
      {/* <LoadingPage /> */}
    </>
  );
}

export default CustomerSupport;
