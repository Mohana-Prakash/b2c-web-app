"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PageTitle from "@/components/headers/pageTitle";
import Accordion from "./accordion";
import { faqCategories } from "@/utils/constants";
import Input from "@/components/FormComponent/input";
import { PlusIcon } from "@/utils/icons";
import DrawerComp from "@/components/drawerComp";
import FAQForm from "./faqForm";
import axiosInstance from "@/store-toolkit/slices/auth/axiosInstance";
import { API_ENDPOINTS } from "@/utils/apiEndpoints";
import { errorToast, extractResponse, successToast } from "@/utils/helperFunc";
import Pagination from "@/components/pagination";
import type { ApiResponse, FaqItem } from "@/utils/types";
import { setDrawer, setLoading } from "@/store-toolkit/slices/UI/uiSlice";
import NoRecords from "@/components/NoRecords";
import LoadingPage from "@/components/loading";
interface FaqFormModeHandlerParams {
  mode: "add" | "edit" | null;
  item: FaqItem | null;
}

function FAQs(): JSX.Element {
  const dispatch = useDispatch();
  const [category, setCategory] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [faqStatus, setFaqStatus] = useState<boolean>(true);
  const [faqData, setFaqData] = useState<ApiResponse<unknown[]>>();
  const [faqFormMode, setFaqFormMode] = useState<"add" | "edit" | null>(null);
  const [selectedItem, setSelectedItem] = useState<FaqItem | null>(null);
  const [faqForm, setFaqForm] = useState<FaqItem>({
    category: "",
    question: "",
    answer: "",
    status: "",
  });

  const getDefaultForm = (mode: "add" | "edit" | null, item: FaqItem | null): FaqItem => {
    if (mode !== "edit" || !item) {
      return { category: "", question: "", answer: "", status: "" };
    }
    return {
      category: item.category,
      question: item.question,
      answer: item.answer,
      status: item.status,
    };
  };

  useEffect(() => {
    setFaqForm(getDefaultForm(faqFormMode, selectedItem));
  }, [faqFormMode, selectedItem]);

  const fetchData = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.get<ApiResponse<FaqItem[]>>(
        API_ENDPOINTS.GET_FAQ_LIST_BY_STATUS(
          currentPage,
          itemsPerPage,
          faqStatus ? "ACTIVE" : "IN_ACTIVE",
          category,
        ),
      );
      const { data, status } = extractResponse(res);
      if (status === 200) {
        setFaqData(data);
      }
    } catch (err) {
      if ((err as { handled?: boolean })?.handled) {
        return;
      }
    } finally {
      dispatch(setLoading(false));
    }
  }, [currentPage, itemsPerPage, faqStatus, category, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const faqFormModeHandler = ({ mode, item }: FaqFormModeHandlerParams) => {
    setFaqFormMode(mode);
    setSelectedItem(item);
    if (mode === "edit") {
      setFaqStatus(item?.status === "ACTIVE" ? true : false);
    }
    dispatch(setDrawer(true));
  };

  const addUpdateFaqHandler = async () => {
    if (!faqForm?.category || !faqForm?.question || !faqForm?.answer) {
      errorToast("Please fill all fields");
      return;
    }
    const req_body = {
      question: faqForm?.question,
      answer: faqForm?.answer,
      ...(faqFormMode === "edit" && { status: faqForm?.status }),
      ...(faqFormMode === "add" && { category: faqForm?.category }),
    };
    const endpoint =
      faqFormMode === "add"
        ? API_ENDPOINTS.CREATE_FAQ
        : API_ENDPOINTS.UPDATE_FAQ(Number(selectedItem?.faqId) || 0);
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
      dispatch(setDrawer(false));
    }
  };

  const drawerCloseHandler = () => {
    dispatch(setDrawer(false));
    setSelectedItem(null);
    setFaqFormMode(null);
    setFaqForm(getDefaultForm(null, null));
  };

  return (
    <>
      <PageTitle heading="Frequently Asked Questions" breadcrumb={true} />
      <div className="flex justify-end mb-2">
        <Input
          name="faqStatusSwitch"
          type="switch"
          onChange={(e) => setFaqStatus((e.target as HTMLInputElement).checked)}
          checked={faqStatus}
        />
      </div>
      <div className="flex lg:flex-row flex-col lg:flex-row justify-between gap-4 mb-2">
        <div className="hidden md:block w-1/5">
          <ul className="text-gray-700 dark:text-gray-200">
            {faqCategories.map((e) => (
              <button
                key={e.label}
                className={`w-full mt-2 text-start focus:outline-none text-xs ${category === e.value ? "text-orange-500 font-semibold underline" : "text-grey-500"}`}
                onClick={() => setCategory(e.value)}
              >
                <span className="ml-1"> {e.label}</span>
              </button>
            ))}
          </ul>
          <div className="flex text-orange-500 items-center mt-2 text-xs border border-orange-500 rounded p-1 w-fit">
            <button
              className="flex items-center"
              onClick={() => faqFormModeHandler({ mode: "add", item: null })}
            >
              <PlusIcon /> <span className="ml-2">Add FAQs</span>
            </button>
          </div>
        </div>
        <div className="block md:hidden">
          <Input
            label="Choose Category"
            type="select"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={faqCategories.map((item) => ({ label: item.label, value: item.value }))}
          />
        </div>
        <div className="w-full lg:w-4/5 h-fit xl:h-[70vh] overflow-y-scroll">
          {Number(faqData?.totalElements) > 0 ? (
            <Accordion
              items={(faqData?.response as FaqItem[]) || []}
              actionHandler={(action, item) =>
                faqFormModeHandler({ mode: action as "add" | "edit" | null, item: item as FaqItem })
              }
            />
          ) : (
            <NoRecords
              title="No records found"
              subTitle="There’s nothing here yet. Please add new items."
            />
          )}
        </div>
      </div>
      {Number(faqData?.totalElements) > 0 && (
        <Pagination
          totalCount={Number(faqData?.totalElements)}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          setItemsPerPage={setItemsPerPage}
          paginationFile={"component"}
        />
      )}
      <DrawerComp
        drawerTitleName={faqFormMode === "add" ? "Add FAQ" : "Edit FAQ"}
        saveButton={addUpdateFaqHandler}
        closeButton={drawerCloseHandler}
      >
        <FAQForm mode={faqFormMode} faqForm={faqForm} setFaqForm={setFaqForm} />
      </DrawerComp>
      <LoadingPage />
    </>
  );
}

export default FAQs;
