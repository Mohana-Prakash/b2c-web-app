import toast from "react-hot-toast";
import Cookies from "js-cookie";
import type { SweetAlertOptions } from "sweetalert2";
import Swal from "sweetalert2";
import type { AxiosResponse } from "axios";

export const infoToast = (message: string): string => {
  return toast(`${message}..!`, {
    duration: 4000,
    style: { backgroundColor: "#D1D5DB", color: "black" },
    icon: "ℹ️",
    iconTheme: {
      primary: "#000",
      secondary: "#fff",
    },
  });
};

export const successToast = (message: string): string => {
  return toast(`${message}..!`, {
    duration: 4000,
    style: { backgroundColor: "#22c55e", color: "white" },
    icon: "👏",
    iconTheme: {
      primary: "#000",
      secondary: "#fff",
    },
  });
};

export const errorToast = (message: string): string => {
  return toast(`${message}..!`, {
    duration: 4000,
    style: { backgroundColor: "#E02424", color: "white" },
    icon: "⚠️",
    iconTheme: {
      primary: "#000",
      secondary: "#fff",
    },
  });
};

export function getCookieData<T>(cookieKey: string): T | null {
  const cookieValue = Cookies.get(cookieKey);
  if (!cookieValue) {
    // console.warn(`Cookie with key "${cookieKey}" not found.`);
    return null;
  }

  try {
    // If it's a JWT token, return as is
    if (cookieValue.split(".").length === 3) {
      return cookieValue as T;
    }

    // Otherwise, parse as JSON
    return JSON.parse(cookieValue) as T;
  } catch (error) {
    console.error(`Error parsing cookie "${cookieKey}":`, error);
    return null;
  }
}

export const swalFunction = (obj: SweetAlertOptions, onConfirm?: () => void): Promise<void> => {
  return Swal.fire(obj).then((result) => {
    if (result.isConfirmed && onConfirm) {
      onConfirm();
    }
  });
};

export const extractResponse = <T = unknown,>(
  response: AxiosResponse<T>,
): { data: T; status: number } => {
  return {
    data: response.data,
    status: response.status,
  };
};

// export const isValidYouTubeEmbedUrl = (url) => {
//   const pattern = /^https:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]+$/;
//   return pattern.test(url);
// };

export const getRelativeTime = (timestamp: string | number | Date): string => {
  interface TimeUnit {
    name: string;
    seconds: number;
  }
  const now = new Date();
  const then = new Date(timestamp);
  const diff = Math.floor((now.getTime() - then.getTime()) / 1000);

  const units: TimeUnit[] = [
    { name: "year", seconds: 31536000 },
    { name: "month", seconds: 2592000 },
    { name: "day", seconds: 86400 },
    { name: "hour", seconds: 3600 },
    { name: "min", seconds: 60 },
    { name: "sec", seconds: 1 },
  ];

  for (const unit of units) {
    const value = Math.floor(diff / unit.seconds);
    if (value >= 1) {
      return `(${value} ${unit.name}${value > 1 ? "s" : ""} ago)`;
    }
  }

  return "just now";
};
