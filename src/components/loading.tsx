import type { RootState } from "@/store-toolkit/reducers";
import React from "react";
import { useSelector } from "react-redux";

const LoadingPage: React.FC = () => {
  const { loading } = useSelector((state: RootState) => state.ui);

  return loading ? (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="circularLoader mb-4"></div>
    </div>
  ) : null;
};

export default LoadingPage;
