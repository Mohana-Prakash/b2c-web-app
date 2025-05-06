"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { login } from "@/store-toolkit/slices/auth/authSlice";
import type { AppDispatch } from "@/store-toolkit/store";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import ImageCarousel from "@/components/imagecarousel";
import Modal from "@/components/modal";
import ForgotPassword from "./forgotPassword";
import Input from "@/components/FormComponent/input";
import ForgotPasswordEmailVerify from "./forgotPasswordVerifyEmail";
import OTPInput from "@/components/otp";
import Cookies from "js-cookie";
import { errorToast } from "@/utils/helperFunc";
interface FormData {
  email: string;
  password: string;
  checkbox: boolean;
  select: string;
}

export default function LoginPage(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    checkbox: false,
    select: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const [verifyEmailModal, setVerifyEmailMOdal] = useState(false);
  const [verifyOtpModal, setVerifyOtpModal] = useState(false);
  const [email, setEmail] = useState("");
  const [accessToken] = useState(Cookies.get("token"));
  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
    checkbox: yup.boolean(),
    select: yup.string(),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ): void => {
    const { name, type, value } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : false;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      const data = await dispatch(
        login({ email: formData.email, password: formData.password }),
      ).unwrap();
      if (data.httpStatus === "OK") {
        router.replace("/dashboard");
      }
    } catch (error) {
      const errorMessage = (error as { response?: { data?: { response?: string } } })?.response
        ?.data?.response;
      errorToast(errorMessage || "An unexpected error occurred");
      if (error instanceof yup.ValidationError) {
        const newErrors: { [key: string]: string } = {};
        error.inner.forEach((err) => {
          if (err.path) {
            newErrors[err.path] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        console.warn("error", error);
      }
    }
  };
  useEffect(() => {
    if (accessToken) {
      router.replace("/dashboard");
    } else {
      window.history.replaceState(null, "", "/auth/login");
      router.replace("/auth/login");
    }
  }, [accessToken, router]);

  return (
    <div className="container mx-auto my-14 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 overflow-hidden">
      <section className="shadow-lg rounded overflow-y-auto h-screen scrollbar-hide p-4">
        <div className="w-full p-4 rounded-lg sm:p-6 md:p-8">
          <form method="POST" className="space-y-10" onSubmit={handleLogin}>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white my-10w">
              Sign in to Intelligrid,
            </h5>
            <Input
              label="Your Email"
              name="email"
              type="text"
              value={formData.email}
              placeholder="Enter text"
              onChange={handleChange}
              errorMessage={errors.email}
            />
            <Input
              label="Your Password"
              name="password"
              type="password"
              value={formData.password}
              placeholder="••••••••"
              onChange={handleChange}
              errorMessage={errors.password}
            />
            <div className="flex items-start justify-center">
              <div className="flex text-sm font-medium text-gray-500 dark:text-gray-300">
                <div>
                  <Input
                    name="checkbox"
                    type="checkbox"
                    value={formData.checkbox}
                    onChange={handleChange}
                  />
                </div>
                <div className="px-2">
                  <p>Remember Me</p>
                </div>
              </div>
              <p
                onClick={() => setVerifyEmailMOdal(!verifyEmailModal)}
                className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500 cursor-pointer"
              >
                Forgot Password?
              </p>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-green-500 hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green dark:hover:bg-greenFocus dark:focus:ring-blue-800"
            >
              Login to your account
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Register as Admin?{" "}
              <Link
                href="/auth/register"
                className="text-blue-700 hover:underline dark:text-blue-500"
              >
                Create account
              </Link>
            </div>
          </form>
        </div>
      </section>
      <aside className="hidden lg:block rounded-2xl px-5">
        <div className="flex items-center justify-center px-10">
          <ImageCarousel />
        </div>
      </aside>
      {forgotPasswordModal && (
        <Modal modalClose={true} title="Create Password" open={forgotPasswordModal}>
          <div>
            <ForgotPassword
              email={email}
              onSuccess={() => {
                setForgotPasswordModal(false);
                router.replace("/auth/login");
              }}
            />
          </div>
        </Modal>
      )}
      {verifyEmailModal && (
        <Modal modalClose={true} title="Create Password" open={verifyEmailModal}>
          <div>
            <ForgotPasswordEmailVerify
              setEmail={setEmail}
              onSuccess={() => {
                setVerifyEmailMOdal(false);
                setVerifyOtpModal(true);
              }}
            />
          </div>
        </Modal>
      )}
      {verifyOtpModal && (
        <Modal title="Email Verification" open={verifyOtpModal}>
          <div>
            <OTPInput
              apiPath={"verify-password-code"}
              onSuccess={() => {
                setVerifyOtpModal(false);
                setForgotPasswordModal(true);
              }}
              email={email}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
