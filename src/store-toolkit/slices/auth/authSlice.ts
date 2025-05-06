"use client";

import { ADMIN_REGISTER_BASE_URL } from "@/store-toolkit/configureUrl";
import { extractResponse, successToast } from "@/utils/helperFunc";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import axiosInstance from "./axiosInstance";
import type { ApiResponse } from "@/utils/types";
interface AuthState {
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  accessToken: Cookies.get("token") || null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${ADMIN_REGISTER_BASE_URL}login`, credentials);
      Cookies.set("token", data.response.accessToken, { path: "/", expires: 7 });
      sessionStorage.setItem("refreshToken", data.response.refreshToken);
      successToast(data.message);
      return data;
    } catch (err: unknown) {
      return rejectWithValue(err || "Login failed");
    }
  },
);
export const refreshAccessToken = createAsyncThunk(
  "auth/refreshAccessToken",
  async (_, { rejectWithValue }) => {
    const refreshToken = sessionStorage.getItem("refreshToken");
    if (!refreshToken) {
      return rejectWithValue("No refresh token");
    }

    try {
      const { data } = await axios.post(`${ADMIN_REGISTER_BASE_URL}refresh-token`, {
        refreshToken,
      });
      Cookies.set("token", data.response.accessToken, { path: "/", expires: 7 });
      sessionStorage.setItem("refreshToken", data.response.refreshToken);
      successToast("Session restored. You can continue using the app.");
      return data.accessToken;
    } catch (err: unknown) {
      return rejectWithValue(err || "Session expired");
    }
  },
);
// export const logout = createAsyncThunk("auth/logout", async () => {
//   Cookies.remove("token");
//   sessionStorage.removeItem("refreshToken");
//   localStorage.clear();
//   window.location.href = "/auth/login";
// });
//
//  use this one for Immediate logout for without making an api call
export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post<ApiResponse<unknown[]>>("profile/logout");
    const { status } = extractResponse(res);
    if (status === 200) {
      Cookies.remove("token");
      sessionStorage.removeItem("refreshToken");
      localStorage.clear();
      window.location.href = "/auth/login";
    }
  } catch (err: unknown) {
    return rejectWithValue(err || "Logout failed");
  }
});
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(refreshAccessToken.rejected, (state) => {
        state.accessToken = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.accessToken = null;
        sessionStorage.clear();
        Cookies.remove("token");
        localStorage.clear();
      });
  },
});

export default authSlice.reducer;
