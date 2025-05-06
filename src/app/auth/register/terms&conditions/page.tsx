"use client";
import TermsAndConditions from "@/components/termsandCondition";
import { useRouter } from "next/navigation";

export default function TermsandConditions(): JSX.Element {
  const router = useRouter();
  return (
    <div className="p-10">
      <TermsAndConditions />
      <button
        onClick={() => router.back()}
        type="submit"
        className="w-auto mt-10 text-white bg-green-500 hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green dark:hover:bg-greenFocus dark:focus:ring-blue-800"
      >
        Back
      </button>
    </div>
  );
}
