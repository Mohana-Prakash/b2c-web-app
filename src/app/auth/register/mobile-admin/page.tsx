import React, { Suspense } from "react";
import AdminRegistrationComp from "./adminRegComp";

export default function AdminRegPage(): JSX.Element {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminRegistrationComp />
    </Suspense>
  );
}
