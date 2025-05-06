"use client";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PageTitle from "@/components/headers/pageTitle";
import Input from "@/components/FormComponent/input";
import { EditIcon } from "@/utils/icons";
import DrawerComp from "@/components/drawerComp";
import EditProfileDetailsComp from "./editProfileDetails";
import axiosInstance from "@/store-toolkit/slices/auth/axiosInstance";
import { API_ENDPOINTS } from "@/utils/apiEndpoints";
import type { ApiResponse, ProfileData } from "@/utils/types";
import { extractResponse, successToast } from "@/utils/helperFunc";
import LoadingPage from "@/components/loading";
import { setDrawer, setLoading } from "@/store-toolkit/slices/UI/uiSlice";

const ProfileSettings: React.FC = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    countryCode: "",
    mobileNumber: "",
  });

  const getDefaultForm = (profileData: ProfileData): typeof profileForm => {
    return {
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      countryCode: profileData.countryCode,
      mobileNumber: profileData.mobileNumber,
    };
  };

  useEffect(() => {
    if (profileData) {
      setProfileForm(getDefaultForm(profileData));
    }
  }, [profileData]);

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // const imageUrl = URL.createObjectURL(file);
      // setProfileImage(imageUrl);
      updateProfileDetails(file);
    }
  };

  useEffect(() => {
    fetchProfileDetails();
  }, []);

  const fetchProfileDetails = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.get<ApiResponse<ProfileData>>(API_ENDPOINTS.GET_PROFILE_INFO);
      const { data, status } = extractResponse(res);
      if (status === 200) {
        setProfileData(data.response as ProfileData);
      }
    } catch (err) {
      if ((err as { handled?: boolean })?.handled) {
        return;
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  const updateProfileDetails = async (file: File | null) => {
    const formdata = new FormData();
    if (file) {
      formdata.append("profilePic", file);
    }
    formdata.append("data", JSON.stringify(profileForm));
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.post<ApiResponse>(API_ENDPOINTS.UPDATE_PROFILE, formdata, {
        headers: {
          ...(file && { "Content-Type": "multipart/form-data" }),
        },
      });
      const { data, status } = extractResponse(res);
      if (status === 200) {
        successToast(data?.message);
        fetchProfileDetails();
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
  };

  return (
    <>
      <PageTitle heading="Profile Settings" breadcrumb={true} />

      <div className="bg-white px-6 py-4 md:px-10 md:py-2">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Profile Picture</h2>
            <div className="relative w-48 m-auto group">
              <img
                src={profileData?.profilePic}
                alt="Profile"
                className="w-full h-48 rounded-full object-cover border-2 border-gray-300"
              />
              <button
                onClick={handleIconClick}
                className="absolute top-[80%] right-[12%] bg-orange-500 text-white p-[6px] rounded-full shadow hover:bg-orange-600 transition"
              >
                <EditIcon />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            <div className="text-center mt-4">
              <p className="text-2xl font-bold text-gray-900">Joseph McFall</p>
              <p className="text-sm font-bold text-gray-500">OPERATION MANAGER</p>
            </div>
          </div>
          {/* <ProfileDetailsComp data={profileData} /> */}
          <div className="bg-gray-200 p-6 border-ra rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center">
                Profile Details
                <span className="ml-2 font-bold bg-[#dcfce7] border border-[#22c55e] text-[#22c55e] text-xs px-2 py-0.5 w-fit m-auto rounded">
                  {profileData?.accountStatus === "ACTIVE" ? "ACTIVE" : "IN ACTIVE"}
                </span>
              </h2>
              <button
                className="bg-orange-500 text-white p-[6px] rounded-full"
                onClick={() => dispatch(setDrawer(true))}
              >
                <EditIcon />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    label="First Name"
                    type="text"
                    value={String(profileData?.firstName)}
                    isDisabled={true}
                  />
                </div>
                <div className="flex-1">
                  <Input
                    label="Last Name"
                    type="text"
                    value={String(profileData?.lastName)}
                    isDisabled={true}
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/4">
                  <Input
                    label="Country Code"
                    type="text"
                    value={profileData?.countryCode || ""}
                    isDisabled={true}
                  />
                </div>
                <div className="flex-1">
                  <Input
                    label="Mobile Number"
                    type="number"
                    value={String(profileData?.mobileNumber)}
                    isDisabled={true}
                  />
                </div>
              </div>
              <Input
                label="Email"
                type="text"
                value={String(profileData?.email)}
                isDisabled={true}
              />
              <Input
                label="Hedera Account ID"
                type="text"
                value={String(profileData?.hederaAccountId)}
                isDisabled={true}
              />
            </div>
            <DrawerComp
              drawerTitleName="Edit Profile Details"
              saveButton={() => updateProfileDetails(null)}
              closeButton={drawerCloseHandler}
            >
              <EditProfileDetailsComp profileForm={profileForm} setProfileForm={setProfileForm} />
            </DrawerComp>
          </div>
        </div>
      </div>
      <LoadingPage />
    </>
  );
};

export default ProfileSettings;
