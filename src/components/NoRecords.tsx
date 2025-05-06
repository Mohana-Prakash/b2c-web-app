import React from "react";

interface NoRecordsProps {
  title: string;
  subTitle: string;
}

export default function NoRecords({ title, subTitle }: NoRecordsProps): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="w-1/4 mb-4">
        <img className="w-full h-full" src="/images/no-records.png" alt="No records found" />
      </div>
      <h2 className="text-lg font-semibold text-grey-500 mb-">{title}</h2>
      <p className="text-sm text-grey-400">{subTitle}</p>
    </div>
  );
}
