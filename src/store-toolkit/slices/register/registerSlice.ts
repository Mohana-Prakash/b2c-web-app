import { errorToast, successToast } from "@/utils/helperFunc";
import { ADMIN_REGISTER_BASE_URL } from "@/store-toolkit/configureUrl";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface RegisterRequest {
  email: string;
  termsAccepted: boolean;
  firstName: string;
  lastName: string;
  countryCode: string;
  mobileNumber: number | undefined;
  role: string;
}

interface RegisterResponse {
  status: number;
  message: string;
  httpStatus: string;
}

interface RegisterState {
  loading: boolean;
  error: string | null;
  success: boolean;
  otpVerified: boolean;
}

const initialState: RegisterState = {
  loading: false,
  error: null,
  success: false,
  otpVerified: false,
};
interface OtpVerifyRequest {
  email: string;
  code: string;
  apiPath: string;
}
interface SetPassword {
  email: string;
  password: string;
  confirmPassword: string;
}
interface SetForgotPassword {
  email: string;
  newPassword: string;
  newConfirmPassword: string;
}
interface VerifyEmail {
  email: string;
}

export const register = createAsyncThunk(
  "auth/register",
  async (userDetails: RegisterRequest, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      // Construct 'data' JSON as a string field
      const {
        firstName,
        lastName,
        email,
        termsAccepted,
        countryCode,
        mobileNumber,
        role,
      }: RegisterRequest = userDetails;
      const jsonPayload = JSON.stringify({
        firstName,
        lastName,
        email,
        termsAccepted,
        countryCode,
        mobileNumber,
        role,
      });
      formData.append("data", jsonPayload);

      // Append profilePic if provided (optional)
      // if (rest.profilePic) {
      //   formData.append("profilePic", rest.profilePic as Blob);
      // }

      const { data } = await axios.post<RegisterResponse>(
        `${ADMIN_REGISTER_BASE_URL}register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (data.status === 200 || data.httpStatus === "OK") {
        successToast(data.message);
        return data;
      } else {
        errorToast(data.message || "Registration failed");
        return rejectWithValue(data.message);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || error.message || "Signup failed";
        errorToast(message);
        return rejectWithValue(message);
      }
      errorToast("An unexpected error occurred");
      return rejectWithValue("An unexpected error occurred");
    }
  },
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, apiPath, code }: OtpVerifyRequest, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<RegisterResponse>(`${ADMIN_REGISTER_BASE_URL}${apiPath}`, {
        email,
        code,
      });

      if (data.status === 200 || data.httpStatus === "OK") {
        successToast(data.message);
        return data;
      } else {
        errorToast(data.message || "OTP Verification failed");
        return rejectWithValue(data.message);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || error.message || "OTP verification failed";
        errorToast(message);
        return rejectWithValue(message);
      }
      errorToast("An unexpected error occurred");
      return rejectWithValue("An unexpected error occurred");
    }
  },
);
export const createPassword = createAsyncThunk(
  "auth/setPassword",
  async ({ email, password, confirmPassword }: SetPassword, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<RegisterResponse>(
        `${ADMIN_REGISTER_BASE_URL}set-password`,
        { email, password, confirmPassword },
      );
      if (data.status === 200 || data.httpStatus === "OK") {
        successToast("Password Created Please Login with your credentials");
        return data;
      } else {
        errorToast(data.message || "Password creation failed");
        return rejectWithValue(data.message);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || error.message || "Password creation failed";
        errorToast(message);
        return rejectWithValue(message);
      }
      errorToast("An unexpected error occurred");
      return rejectWithValue("An unexpected error occurred");
    }
  },
);
export const createNewPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ email, newPassword, newConfirmPassword }: SetForgotPassword, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<RegisterResponse>(
        `${ADMIN_REGISTER_BASE_URL}reset-password`,
        { email, newPassword, newConfirmPassword },
      );
      if (data.status === 200 || data.httpStatus === "OK") {
        successToast("Password updated Please Login with your credentials");
        return data;
      } else {
        errorToast(data.message || "Password reset failed");
        return rejectWithValue(data.message);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || error.message || "Password reset failed";
        errorToast(message);
        return rejectWithValue(message);
      }
      errorToast("An unexpected error occurred");
      return rejectWithValue("An unexpected error occurred");
    }
  },
);
export const verifyEmail = createAsyncThunk(
  "auth/verifyemail",
  async ({ email }: VerifyEmail, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<RegisterResponse>(
        `${ADMIN_REGISTER_BASE_URL}forgot-password`,
        { email },
      );
      if (data.status === 200 || data.httpStatus === "OK") {
        successToast("Email Verified");
        return data;
      } else {
        errorToast(data.message || "Email Verification failed");
        return rejectWithValue(data.message);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || error.message || "Email Verification failed";
        errorToast(message);
        return rejectWithValue(message);
      }
      errorToast("An unexpected error occurred");
      return rejectWithValue("An unexpected error occurred");
    }
  },
);
const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    resetRegisterState(state) {
      state.success = false;
      state.error = null;
    },
    resetOtpState(state) {
      state.otpVerified = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //otp
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.loading = false;
        state.otpVerified = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.otpVerified = false;
        state.error = action.payload as string;
      })
      //setPassword
      .addCase(createPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //reset-password
      .addCase(createNewPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createNewPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //Email Verify
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetRegisterState, resetOtpState } = registerSlice.actions;
export default registerSlice.reducer;
