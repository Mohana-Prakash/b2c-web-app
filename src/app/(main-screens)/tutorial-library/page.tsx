"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PageTitle from "@/components/headers/pageTitle";
import Input from "@/components/FormComponent/input";
import Pagination from "@/components/pagination";
import VideoCard from "./videoCard";
import type { ApiResponse, VideoItem } from "@/utils/types";
import { setDrawer, setLoading } from "@/store-toolkit/slices/UI/uiSlice";
import DrawerComp from "@/components/drawerComp";
import { errorToast, extractResponse, successToast } from "@/utils/helperFunc";
import { API_ENDPOINTS } from "@/utils/apiEndpoints";
import axiosInstance from "@/store-toolkit/slices/auth/axiosInstance";
import VideoForm from "./videoForm";
import { PlusIcon } from "@/utils/icons";
import NoRecords from "@/components/NoRecords";
import LoadingPage from "@/components/loading";

interface VideoFormModeHandlerParams {
  mode: "add" | "edit" | null;
  item: VideoItem | null;
}

function TutorialLibrary(): JSX.Element {
  const dispatch = useDispatch();
  const [videoStatus, setVideoStatus] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [videoFormMode, setVideoFormMode] = useState<"add" | "edit" | null>(null);
  const [selectedItem, setSelectedItem] = useState<VideoItem | null>(null);
  const [videoData, setVideoData] = useState<ApiResponse<VideoItem[]>>();
  const [videoForm, setVideoForm] = useState<VideoItem>({
    title: "",
    description: "",
    videoUrl: "",
    status: "",
  });

  const getDefaultForm = (mode: "add" | "edit" | null, item: VideoItem | null): VideoItem => {
    if (mode !== "edit" || !item) {
      return { title: "", description: "", videoUrl: "", status: "" };
    }
    return {
      title: item.title,
      description: item.description,
      videoUrl: item.videoUrl,
      status: item.status,
    };
  };

  useEffect(() => {
    setVideoForm(getDefaultForm(videoFormMode, selectedItem));
  }, [selectedItem, videoFormMode]);

  const fetchData = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.get<ApiResponse<VideoItem[]>>(
        API_ENDPOINTS.GET_VIDEO_LIST_BY_STATUS(
          currentPage,
          itemsPerPage,
          videoStatus ? "ACTIVE" : "IN_ACTIVE",
        ),
      );
      const { data, status } = extractResponse(res);
      if (status === 200) {
        setVideoData(data);
      }
    } catch (err) {
      if ((err as { handled?: boolean })?.handled) {
        return;
      }
    } finally {
      dispatch(setLoading(false));
    }
  }, [currentPage, itemsPerPage, videoStatus, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const videoFormModeHandler = ({ mode, item }: VideoFormModeHandlerParams) => {
    setVideoFormMode(mode);
    setSelectedItem(item);
    if (mode === "edit") {
      setVideoStatus(item?.status === "ACTIVE" ? true : false);
    }
    dispatch(setDrawer(true));
  };

  const addUpdateVideoHandler = async () => {
    if (!videoForm.title || !videoForm.description || !videoForm.videoUrl) {
      errorToast("Please fill all fields");
      return;
    }
    const req_body = {
      title: videoForm.title,
      description: videoForm.description,
      videoUrl: videoForm.videoUrl,
      ...(videoFormMode === "edit" && { status: videoForm.status }),
    };
    const endpoint =
      videoFormMode === "add"
        ? API_ENDPOINTS.CREATE_VIDEO
        : API_ENDPOINTS.UPDATE_VIDEO(Number(selectedItem?.id));
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
    setVideoFormMode(null);
    setVideoForm(getDefaultForm(null, null));
  };

  return (
    <>
      <PageTitle heading="Tutorial Videos" breadcrumb={true} />
      <div className="flex justify-between items-center mb-2">
        <div className="flex text-orange-500 items-center text-xs border border-orange-500 rounded p-1 w-fit">
          <button
            className="flex items-center"
            onClick={() => videoFormModeHandler({ mode: "add", item: null })}
          >
            <PlusIcon /> <span className="ml-2">Add Video</span>
          </button>
        </div>
        <Input
          type="switch"
          onChange={(e) => setVideoStatus((e.target as HTMLInputElement).checked)}
          checked={videoStatus}
        />
      </div>
      {Number(videoData?.totalElements) > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 overflow-y-scroll h-fit xl:h-[70vh]">
          {videoData?.response?.map((item, index) => (
            <VideoCard
              key={index}
              item={item}
              actionHandler={(action, item) =>
                videoFormModeHandler({
                  mode: action as "add" | "edit" | null,
                  item: item as VideoItem,
                })
              }
            />
          ))}
        </div>
      ) : (
        <NoRecords
          title="No records found"
          subTitle="There’s nothing here yet. Please add new items."
        />
      )}

      {Number(videoData?.totalElements) > 0 && (
        <Pagination
          totalCount={Number(videoData?.totalElements)}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          setItemsPerPage={setItemsPerPage}
          paginationFile={"component"}
        />
      )}
      <DrawerComp
        drawerTitleName={videoFormMode === "add" ? "Add Video Details" : "Edit Video Details"}
        saveButton={addUpdateVideoHandler}
        closeButton={drawerCloseHandler}
      >
        <VideoForm mode={videoFormMode} videoForm={videoForm} setVideoForm={setVideoForm} />
      </DrawerComp>
      <LoadingPage />
    </>
  );
}

export default TutorialLibrary;
