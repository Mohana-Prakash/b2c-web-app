import { verifyOtp } from "@/store-toolkit/slices/register/registerSlice";
import type { AppDispatch } from "@/store-toolkit/store";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

const OTP_LENGTH = 6;

const OTPInput = ({
  email,
  apiPath,
  onSuccess,
}: {
  email: string;
  apiPath: string;
  onSuccess: () => void;
}): JSX.Element => {
  const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState<boolean>(false);
  const [resendTimer, setResendTimer] = useState<number>(30);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value.replace(/\D/g, "");
    if (!value) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value[0];
    setOtp(newOtp);
    setError(false);
    if (index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("Text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (pasted.length === OTP_LENGTH) {
      setOtp(pasted.split(""));
      inputsRef.current[OTP_LENGTH - 1]?.focus();
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    try {
      if (code.length === 6) {
        const res = await dispatch(verifyOtp({ email, apiPath, code: otp.join("") })).unwrap();
        if (res.httpStatus === "OK") {
          onSuccess();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (resendTimer === 0) {
      return;
    }
    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendTimer, otp]);

  const handleResend = () => {
    setOtp(new Array(OTP_LENGTH).fill(""));
    setResendTimer(30);
    setError(false);
    alert("OTP Resent!");
  };
  return (
    <div className="flex flex-col items-center space-y-4 p-16 gap-3">
      <div>
        <h2 className="text-xl font-semibold">Verify Your Email Address</h2>
        <p className="py-3">We sent a code to {email}</p>{" "}
      </div>
      <div className="flex gap-2 my-4">
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={(el) => {
              inputsRef.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onPaste={handlePaste}
            className={`w-12 h-12 text-center text-xl border rounded-lg focus:outline-none focus:ring-2 ${
              error ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-500"
            } text-black`}
          />
        ))}
      </div>

      {error && <p className="text-red-500 text-sm">Invalid OTP. Please try again.</p>}

      <button
        disabled={otp.join("").length !== 6}
        onClick={handleVerify}
        className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition w-full disabled:bg-blue-300 disabled:cursor-not-allowed"
      >
        Verify OTP
      </button>

      <div className="text-sm mt-2">
        {resendTimer > 0 ? (
          <span className="text-red-600">Resend OTP in {resendTimer}s</span>
        ) : (
          <button onClick={handleResend} className="text-blue-600 hover:underline">
            Resend OTP
          </button>
        )}
      </div>
    </div>
  );
};

export default OTPInput;
