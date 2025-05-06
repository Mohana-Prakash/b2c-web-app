import axios from "axios";
import Cookies from "js-cookie";
import { store } from "@/store-toolkit/store";
import { refreshAccessToken } from "./authSlice";
import { MOBILE_ADMIN_URL } from "@/store-toolkit/configureUrl";
import { swalFunction } from "@/utils/helperFunc";
import { redirect } from "next/navigation";

const axiosInstance = axios.create({
  baseURL: MOBILE_ADMIN_URL,
});

const sessionResetErrors = ["MISSING_REFRESH_TOKEN", "DUPLICATE_SESSION", "EXPIRED_REFRESH_TOKEN"];

function getSessionErrorText(errorCode: string): string {
  switch (errorCode) {
    case "MISSING_REFRESH_TOKEN":
      return "Your session has ended. Please log in again to continue.";
    case "DUPLICATE_SESSION":
      return "Your account is active on another device. Please log in again to continue.";
    default:
      return "Please click below to refresh your session.";
  }
}

function showSwal(title: string, text: string) {
  swalFunction(
    {
      title,
      text,
      icon: "error",
      confirmButtonText: "OK",
    },
    () => {},
  );
}

function handleNetworkError() {
  swalFunction(
    {
      title: "Network Error",
      text: "Please check your internet connection!",
      icon: "error",
      confirmButtonText: "OK",
    },
    () => {},
  );
}

function isAuthError(status: number, errorCode: string): boolean {
  return (
    status === 401 &&
    [
      "EXPIRED_ACCESS_TOKEN",
      "DUPLICATE_SESSION",
      "MISSING_ACCESS_TOKEN",
      "MISSING_REFRESH_TOKEN",
      "EXPIRED_REFRESH_TOKEN",
    ].includes(errorCode)
  );
}

function handleSessionError(errorCode: string) {
  const buttonText = sessionResetErrors.includes(errorCode) ? "Login Again" : "Refresh Session";
  swalFunction(
    {
      title: "Session Expired",
      text: getSessionErrorText(errorCode),
      icon: "warning",
      confirmButtonText: buttonText,
      allowOutsideClick: false,
    },
    () => {
      if (sessionResetErrors.includes(errorCode)) {
        Cookies.remove("token");
        sessionStorage.removeItem("refreshToken");
        redirect("/auth/login");
      } else {
        store.dispatch(refreshAccessToken()).catch((refreshError) => {
          console.error("Failed to refresh token:", refreshError);
        });
      }
    },
  );
}

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    const refreshToken = sessionStorage.getItem("refreshToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["Refresh-Token"] = refreshToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      handleNetworkError();
      return Promise.reject({ handled: true, message: "Network Error. Please try again later." });
    }

    const { status, error: errorCode } = error.response.data || {};

    if (isAuthError(status, errorCode) && !originalRequest._retry) {
      originalRequest._retry = true;
      handleSessionError(errorCode);
      return Promise.reject({
        handled: true,
        message: "Token expired, user must refresh session.",
      });
    }

    if (status === 400) {
      showSwal("Bad Request", "Something went wrong with your request.");
      return Promise.reject({ handled: true, message: "Bad Request. Please try again." });
    }

    if (status === 404) {
      showSwal("Not Found", "Requested resource was not found.");
      return Promise.reject({ handled: true, message: "Requested resource not found." });
    }

    if (status >= 500) {
      showSwal("Server Error", "Something went wrong on the server!");
      return Promise.reject({ handled: true, message: "Server error. Please try again later." });
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
