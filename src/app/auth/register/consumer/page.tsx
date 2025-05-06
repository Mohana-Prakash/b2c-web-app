"use client";
import React, { useState } from "react";
import Link from "next/link";
import * as yup from "yup";
import ImageCarousel from "@/components/imagecarousel";
import Input from "@/components/FormComponent/input";

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  givenName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  address: yup.string().required("Address is required"),
  post_code: yup.number().typeError("Postcode must be a number").required("Postcode is required"),
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
  mobileNo: yup
    .number()
    .typeError("Mobile number must be a number")
    .required("Mobile number is required"),
  estCarbonCredit: yup.number().typeError("Must be a number").required("This field is required"),
  estIREC: yup.number().typeError("Must be a number").required("This field is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  repeatpassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  termCondition: yup.bool().oneOf([true], "You must accept the terms and conditions").required(),
});

export default function ComsumerSignUp(): JSX.Element {
  // const dispatch = useDispatch<AppDispatch>();
  interface FormData {
    email: string;
    password: string;
    termCondition: boolean;
    select: string;
    title: string;
    givenName: string;
    lastName: string;
    address: string;
    post_code: number | undefined;
    city: string;
    country: string;
    mobileNo: number | undefined;
    estCarbonCredit: number | undefined;
    estIREC: number | undefined;
    repeatpassword: string;
    role: Array<string>;
  }
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    termCondition: false,
    select: "",
    title: "",
    givenName: "",
    lastName: "",
    address: "",
    post_code: 0,
    city: "",
    country: "",
    mobileNo: 0,
    role: ["ROLE_CONSUMER"],
    estCarbonCredit: 0,
    estIREC: 0,
    repeatpassword: "",
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
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      // await dispatch(register(formData));
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
          <form method="POST" className="space-y-6" onSubmit={handleLogin}>
            <h1 className="text-xl font-bold text-gray-900 dark:text-green-400 text-center pb-5">
              <b>Intelligrid Consumer Registration Form</b>
            </h1>
            <h5 className="text-xl font-semibold text-gray-900 dark:text-white">User Details</h5>
            <Input
              className="font-bold"
              label="Title"
              name="title"
              type="text"
              value={formData.title}
              placeholder="Mr/Mrs"
              onChange={handleChange}
              errorMessage={errors.title}
            />
            <Input
              label="First Name"
              name="givenName"
              type="text"
              value={formData.givenName}
              placeholder="John"
              onChange={handleChange}
              errorMessage={errors.givenName}
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
              label="Address"
              name="address"
              type="text"
              value={formData.address}
              placeholder="No.15/1,Rich Street,Coloumbo,Srilanka"
              onChange={handleChange}
              errorMessage={errors.address}
            />
            <Input
              label="Post Code"
              name="post_code"
              type="number"
              value={formData.post_code}
              placeholder="6006889"
              onChange={handleChange}
              errorMessage={errors.post_code}
            />
            <Input
              label="City"
              name="city"
              type="text"
              value={formData.city}
              placeholder="Coloumbo"
              onChange={handleChange}
              errorMessage={errors.city}
            />
            <Input
              label="Country"
              name="country"
              type="text"
              value={formData.country}
              placeholder="Srilanka"
              onChange={handleChange}
              errorMessage={errors.country}
            />
            <Input
              label="Mobile Number"
              name="mobileNo"
              type="number"
              value={formData.mobileNo}
              placeholder="+9488987692"
              onChange={handleChange}
              errorMessage={errors.mobileNo}
            />
            <h5 className="text-xl font-semibold text-gray-900 dark:text-white">Your Estimation</h5>
            <Input
              label="Estimated Annual Purchase of Carbon Credits"
              name="estCarbonCredit"
              type="text"
              value={formData.estCarbonCredit}
              placeholder="Toness"
              onChange={handleChange}
              errorMessage={errors.estCarbonCredit}
            />
            <Input
              label="Estimated Annual Purchase of Energy I-Rec"
              name="estIREC"
              type="text"
              value={formData.estIREC}
              placeholder="Toness"
              onChange={handleChange}
              errorMessage={errors.estIREC}
            />
            <h5 className="text-xl font-semibold text-gray-900 dark:text-white">Sign In-Info</h5>
            <Input
              label="Email"
              name="email"
              type="text"
              value={formData.email}
              placeholder="johnkennedy@gmail.com"
              onChange={handleChange}
              errorMessage={errors.email}
            />
            <Input
              label="Create Password"
              name="password"
              type="password"
              value={formData.password}
              placeholder="*******"
              onChange={handleChange}
              errorMessage={errors.password}
            />
            <Input
              label="Confirm Password"
              name="repeatpassword"
              type="password"
              value={formData.repeatpassword}
              placeholder="*******"
              onChange={handleChange}
              errorMessage={errors.repeatpassword}
            />
            <div className="flex items-start justify-between">
              <div className="flex items-start justify-between">
                <div className="flex text-sm font-medium text-gray-500 dark:text-gray-300">
                  <div>
                    <Input
                      name="termCondition"
                      type="checkbox"
                      value={formData.termCondition}
                      onChange={handleChange}
                      errorMessage={errors.termCondition}
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
              Login to your account
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
    </div>
  );
}
