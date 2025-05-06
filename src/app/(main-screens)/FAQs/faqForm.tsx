import React from "react";
import Input from "@/components/FormComponent/input";
import { faqCategories } from "@/utils/constants";

interface FAQFormProps {
  mode: "add" | "edit" | null;
  faqForm: {
    category: string;
    question: string;
    answer: string;
    status: string;
  };
  setFaqForm: React.Dispatch<
    React.SetStateAction<{
      category: string;
      question: string;
      answer: string;
      status: string;
    }>
  >;
}

export default function FAQForm({ mode, faqForm, setFaqForm }: FAQFormProps): JSX.Element {
  return (
    <>
      {mode === "add" && (
        <div>
          <Input
            label="Choose Category"
            type="select"
            name="category"
            value={faqForm.category || ""}
            onChange={(e) =>
              setFaqForm((prev) => ({
                ...prev,
                category: e.target.value,
              }))
            }
            options={faqCategories
              .slice(1)
              .map((item) => ({ label: item.label, value: item.value }))}
          />
        </div>
      )}
      <div className="mt-2">
        <Input
          label="Question"
          type="text"
          name="question"
          placeholder="Enter your question here..."
          value={faqForm.question || ""}
          onChange={(e) =>
            setFaqForm((prev) => ({
              ...prev,
              question: e.target.value,
            }))
          }
          isDisabled={false}
        />
      </div>
      <div className="mt-2">
        <Input
          label="Answer"
          type="textarea"
          placeholder="Type your answer here..."
          name="answer"
          value={faqForm.answer || ""}
          onChange={(e) =>
            setFaqForm((prev) => ({
              ...prev,
              answer: e.target.value,
            }))
          }
          isDisabled={false}
        />
      </div>
      {mode === "edit" && (
        <>
          {/* <div className="flex items-center w-full my-4">
            <div className="flex-grow h-px bg-gray-400"></div>
            <span className="px-3 text-grey-500 text-sm">or</span>
            <div className="flex-grow h-px bg-gray-400"></div>
          </div> */}
          <div className="mt-2">
            <p className="m-0 text-xs text-grey-500">Status</p>
            <Input
              name="faqStatusSwitch"
              type="switch"
              onChange={(e) =>
                setFaqForm((prev) => ({
                  ...prev,
                  status: (e.target as HTMLInputElement).checked ? "ACTIVE" : "IN_ACTIVE",
                }))
              }
              checked={faqForm.status === "ACTIVE" ? true : false}
            />
            <p className="text-xs text-gray-500 mt-1">
              <span className="font-semibold">Note:</span>
              <br />
              If you set the status to <span className="font-semibold">
                Active
              </span>, user will be able to view this item.
              <br />
              If you set it to <span className="font-semibold">
                Inactive
              </span>, user will not be able to see it.
            </p>
          </div>
        </>
      )}
    </>
  );
}
