"use client";
import React, { useState } from "react";
import Input from "@/components/FormComponent/input";
import PageTitle from "@/components/headers/pageTitle";

function AdminInvitation(): JSX.Element {
  const [adminEmail, setAdminEmail] = useState("");
  const sendInvitation = () => {
    console.log(adminEmail);
  };
  return (
    <>
      <PageTitle heading="Invite Operation Manager" breadcrumb={true} />
      <div className="flex items-center px-6 py-4 md:px-10 md:py-2">
        <div className="w-2/5 shado-md px-6 py-12 border-ra rounded-lg">
          <p className="font-normal text-grey-400">
            Add a team member to manage platform settings and users.
          </p>
          <div className="my-5">
            <Input
              type="text"
              name="email"
              onChange={(e) => setAdminEmail(e.target.value)}
              value={adminEmail}
              placeholder="Admin Email Address"
            />
          </div>
          <button
            className="focus:outline-none text-white bg-orange-500 font-medium rounded-md text-base px- py-2 w-full"
            onClick={sendInvitation}
          >
            <span className="m-4">Send Invitation</span>
          </button>
        </div>
        <div className="w-3/5 h-[70vh] bg-red-500">
          <img alt="admin-invite" className="w-full h-full" src="/images/admin-invite.png" />
        </div>
      </div>
    </>
  );
}

export default AdminInvitation;
