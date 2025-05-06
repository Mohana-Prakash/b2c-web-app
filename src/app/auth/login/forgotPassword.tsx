"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store-toolkit/store";
import * as yup from "yup";
import { createNewPassword } from "@/store-toolkit/slices/register/registerSlice";
import Input from "@/components/FormComponent/input";

export default function ForgotPassword({
  email,
  onSuccess,
}: {
  email: string;
  onSuccess: () => void;
}): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  interface FormData {
    email: string;
    newPassword: string;
    newConfirmPassword: string;
  }

  const [formData, setFormData] = useState<FormData>({
    email: email,
    newPassword: "",
    newConfirmPassword: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),

    newPassword: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),

    newConfirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword")], "Passwords must match")
      .required("Please confirm your password"),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      const response = await dispatch(
        createNewPassword({
          email: formData.email,
          newPassword: formData.newPassword,
          newConfirmPassword: formData.newConfirmPassword,
        }),
      ).unwrap();
      if (response.httpStatus === "OK") {
        onSuccess();
      }
    } catch (error) {
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

  return (
    <div className="flex flex-col items-center p-10 ">
      <form method="POST" className="space-y-6 w-full" onSubmit={handlePasswordUpdate}>
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
          label="New Password"
          name="newPassword"
          type="password"
          value={formData.newPassword}
          placeholder="••••••••"
          onChange={handleChange}
          errorMessage={errors.newPassword}
        />
        <Input
          label="Confirm Password"
          name="newConfirmPassword"
          type="password"
          value={formData.newConfirmPassword}
          placeholder="••••••••"
          onChange={handleChange}
          errorMessage={errors.newConfirmPassword}
        />
        <button
          style={{ marginTop: "2rem" }}
          type="submit"
          className="w-full text-white bg-green-500 hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green dark:hover:bg-greenFocus dark:focus:ring-blue-800"
        >
          Create new Password
        </button>
      </form>
    </div>
  );
}
