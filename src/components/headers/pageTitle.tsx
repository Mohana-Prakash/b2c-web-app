"use client";
import React from "react";
import Breadcrumb from "../breadCrumbs";

interface PageTitleProps {
  heading: string;
  breadcrumb?: boolean;
}

const PageTitle: React.FC<PageTitleProps> = ({ heading, breadcrumb }) => {
  return (
    <div className="mb-6">
      <p className="font-bold text-xl text-orange-500">{heading}</p>
      {breadcrumb && <Breadcrumb />}
    </div>
  );
};

export default PageTitle;
