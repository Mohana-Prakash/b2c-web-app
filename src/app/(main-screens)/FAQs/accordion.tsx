"use client";
import { orange500 } from "@/utils/constants";
import { EditIcon } from "@/utils/icons";
import { useRef, useState, useEffect } from "react";

interface QAItem {
  question: string;
  answer: string;
}
interface QAAccordionProps {
  items: QAItem[];
  actionHandler?: (action: "edit" | "add" | "delete", item: QAItem) => void;
}

export default function Accordion({ items, actionHandler }: QAAccordionProps): JSX.Element {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          isOpen={openIndex === index}
          onClick={() => toggle(index)}
          title={item.question}
          value={item.answer}
          item={item}
          actionHandler={actionHandler}
        />
      ))}
    </div>
  );
}

function AccordionItem({
  isOpen,
  onClick,
  title,
  value,
  item,
  actionHandler,
}: {
  isOpen: boolean;
  onClick: () => void;
  title: string;
  value: string;
  item: QAItem;
  actionHandler?: (action: "edit" | "add" | "delete", item: QAItem) => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string>("0px");

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setHeight("0px");
    }
  }, [isOpen]);

  return (
    <div className="border rounded-md overflow-hidden">
      <button
        onClick={onClick}
        aria-expanded={isOpen}
        className="w-full flex justify-between items-center p-4 text-left bg-gray-100 hover:bg-gray-200"
      >
        <p className="text-sm text-grey-500">{title}</p>
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          fill="#F68456"
          stroke="#F68456"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        ref={contentRef}
        style={{ height }}
        className="transition-all duration-300 ease-in-out overflow-hidden"
      >
        <div className="px-4 pt-4">
          <p className="text-sm text-gray-400">{value}</p>
        </div>

        <div className="flex items-center justify-end py-1 pr-4">
          <button
            className="hover:opacity-70"
            onClick={() => actionHandler && actionHandler("edit", item)}
          >
            <EditIcon color={orange500} />
          </button>
        </div>
      </div>
    </div>
  );
}
