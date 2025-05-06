"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import * as yup from "yup";
import ImageCarousel from "@/components/imagecarousel";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store-toolkit/store";
import { register } from "@/store-toolkit/slices/register/registerSlice";
import Modal from "@/components/modal";
import OTPInput from "../../../../components/otp";
import CreatePassword from "./createPassword";
import { useRouter, useSearchParams } from "next/navigation";
import Input from "@/components/FormComponent/input";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  countryCode: yup.number().required("Countrycode is required"),
  mobileNumber: yup
    .number()
    .typeError("Mobile number must be a number")
    .required("Mobile number is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  termsAccepted: yup.bool().oneOf([true], "You must accept the terms and conditions").required(),
});

export default function AdminRegistrationComp(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const router = useRouter();
  interface RegisterRequest {
    email: string;
    termsAccepted: boolean;
    firstName: string;
    lastName: string;
    countryCode: string;
    mobileNumber: number | undefined;
    role: string;
  }
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<RegisterRequest>({
    firstName: "",
    email: "",
    termsAccepted: false,
    lastName: "",
    countryCode: "+91",
    mobileNumber: 0,
    role: "APP_ADMIN",
  });
  const [passwordModal, setPasswordModal] = useState(false);
  const [modal, setModal] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ): void => {
    const { name, type, value } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : false;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      alert(`Token: ${token}`);
    }
  }, [router]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      const resultAction = await dispatch(register(formData));
      if (register.fulfilled.match(resultAction)) {
        if (resultAction.payload?.httpStatus === "OK") {
          setModal(true);
        }
      }
    } catch (err) {
      const validationErrors: { [key: string]: string } = {};
      if (err instanceof yup.ValidationError) {
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
        setErrors(validationErrors);
      }
    }
  };
  return (
    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 overflow-hidden">
      <section className="shadow-lg rounded overflow-y-auto h-screen scrollbar-hide p-4">
        <div className="w-full p-4 rounded-lg sm:p-6 md:p-8">
          <form method="POST" className="space-y-6" onSubmit={handleRegister}>
            <h1 className="text-xl font-bold text-white dark:text-green-400 text-center pb-5">
              <b>Intelligrid Admin Registration Form</b>
            </h1>
            <h5 className="text-xl font-semibold text-gray-900 dark:text-white">User Details</h5>
            <Input
              label="First Name"
              name="firstName"
              type="text"
              value={formData.firstName}
              placeholder="John"
              onChange={handleChange}
              errorMessage={errors.firstName}
            />
            <Input
              label="Last Name"
              name="lastName"
              type="text"
              value={formData.lastName}
              placeholder="Kennedy"
              onChange={handleChange}
              errorMessage={errors.lastName}
            />
            <h5 className="text-xl font-semibold text-gray-900 dark:text-white">Address Details</h5>
            <Input
              label="Country Code"
              name="countryCode"
              type="number"
              value={+91}
              placeholder="+91"
              onChange={handleChange}
              errorMessage={errors.countryCode}
            />
            <Input
              label="Mobile Number"
              name="mobileNumber"
              type="number"
              value={formData.mobileNumber}
              placeholder="+9488987692"
              onChange={handleChange}
              errorMessage={errors.mobileNumber}
            />
            <Input
              label="Email"
              name="email"
              type="text"
              value={formData.email}
              placeholder="johnkennedy@gmail.com"
              onChange={handleChange}
              errorMessage={errors.email}
            />
            <div className="flex items-start justify-between">
              <div className="flex items-start justify-between">
                <div className="flex text-sm font-medium text-gray-500 dark:text-gray-300">
                  <div>
                    <Input
                      name="termsAccepted"
                      type="checkbox"
                      value={formData.termsAccepted}
                      onChange={handleChange}
                      errorMessage={errors.termsAccepted}
                    />
                  </div>
                  <div className="px-2">
                    <b>I agree to the Intelligrid Terms and Conditions</b>
                  </div>
                </div>
              </div>
              <div>
                <Link
                  href="/auth/register/terms&conditions"
                  className="text-blue-700 hover:underline dark:text-blue-500"
                >
                  Terms&Conditions
                </Link>
              </div>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-green-500 hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green dark:hover:bg-greenFocus dark:focus:ring-blue-800"
            >
              Register as Admin
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Already registered?{" "}
              <Link href="/auth/login" className="text-blue-700 hover:underline dark:text-blue-500">
                Login
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
      {modal && (
        <Modal title="Email Verification" open={modal}>
          <div>
            <OTPInput
              apiPath={"verify-registration-code"}
              onSuccess={() => {
                setModal(false);
                setPasswordModal(true);
              }}
              email={formData.email}
            />
          </div>
        </Modal>
      )}
      {passwordModal && (
        <Modal title="Create Password" open={passwordModal}>
          <div>
            <CreatePassword
              email={formData.email}
              onSuccess={() => {
                setPasswordModal(false);
                router.replace("/auth/login");
              }}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
