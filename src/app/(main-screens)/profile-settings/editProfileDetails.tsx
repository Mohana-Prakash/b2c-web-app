"use client";
import Input from "@/components/FormComponent/input";
import type { ProfileData } from "@/utils/types";
import React from "react";

interface EditProfileDetailsProps {
  profileForm: ProfileData;
  setProfileForm: React.Dispatch<React.SetStateAction<ProfileData>>;
}

function EditProfileDetailsComp({
  profileForm,
  setProfileForm,
}: EditProfileDetailsProps): JSX.Element {
  return (
    <>
      <div className="mb-4">
        <Input
          label="First Name"
          type="text"
          name="firstName"
          onChange={(e) => setProfileForm((prev) => ({ ...prev, firstName: e.target.value }))}
          value={String(profileForm?.firstName)}
        />
      </div>
      <div className="mb-4">
        <Input
          label="Second Name"
          type="text"
          name="lastName"
          onChange={(e) => setProfileForm((prev) => ({ ...prev, lastName: e.target.value }))}
          value={String(profileForm?.lastName)}
        />
      </div>
      <div className="mb-4">
        <Input
          label="Country Code"
          type="text"
          name="countryCode"
          onChange={(e) => setProfileForm((prev) => ({ ...prev, countryCode: e.target.value }))}
          value={String(profileForm?.countryCode)}
        />
      </div>
      <div className="mb-4">
        <Input
          label="Mobile Number"
          type="text"
          name="mobileNumber"
          onChange={(e) => setProfileForm((prev) => ({ ...prev, mobileNumber: e.target.value }))}
          value={String(profileForm?.mobileNumber)}
        />
      </div>
    </>
  );
}

export default EditProfileDetailsComp;
