import React, { useCallback, useEffect } from "react";
import Flatpickr from "react-flatpickr";
import type { DateTimePickerProps } from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";

interface DateRangePickerProps {
  dateRange: Date[] | undefined;
  setDateRange: (dates: Date[]) => void;
}

// Function to transform the value into a React-compatible format
const getTransformedValue = (value: unknown): string | undefined => {
  if (Array.isArray(value)) {
    return value
      .map((v) => (v instanceof Date ? v.toISOString().split("T")[0] : String(v)))
      .join(" to ");
  } else if (value instanceof Date) {
    return value.toISOString().split("T")[0];
  } else if (typeof value === "string" || typeof value === "number") {
    return String(value);
  } else {
    return undefined;
  }
};

const DateRangePicker: React.FC<DateRangePickerProps> = ({ dateRange, setDateRange }) => {
  const initializeDateRange = useCallback(() => {
    const today = new Date();
    const fourDaysAgo = new Date(today.getTime() - 4 * 24 * 60 * 60 * 1000);
    setDateRange([fourDaysAgo, today]);
  }, [setDateRange]);

  useEffect(() => {
    initializeDateRange();
  }, [initializeDateRange]);

  return (
    <div className="w-full">
      <label className="block text-xs font-medium text-grey-400 dark:text-white">
        Select Dates
      </label>
      <Flatpickr
        value={dateRange}
        onChange={(dates: Date[]) => setDateRange(dates)}
        options={{
          mode: "range",
          dateFormat: "d-m-Y",
        }}
        render={(
          {
            onChange: _onChange,
            value,
            ...restProps
          }: Omit<DateTimePickerProps, "options" | "render">,
          ref: (node: HTMLInputElement | null) => void,
        ) => {
          // Transform the `value` into a React-compatible format
          const transformedValue = getTransformedValue(value);

          return (
            <input
              {...restProps} // Spread the remaining props
              value={transformedValue} // Use the transformed value
              ref={ref} // Pass the ref
              className="cursor-pointer text-center text-grey-500 w-full border border-gray-200 bg-green-100 rounded shadow-sm p-2 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800"
              placeholder="Select Date Range"
              readOnly // Mark as read-only to avoid mutation
            />
          );
        }}
      />
    </div>
  );
};

export default DateRangePicker;
