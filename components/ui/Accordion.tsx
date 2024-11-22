"use client";
import { accordionData } from "@/constants";
import React, { useState } from "react";

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleAccordion = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(0);
    } else {
      setActiveIndex(index);
    }
  };
  return (
    <div className="lg:ms-8 md:mt-0 mt-8">
      <div id="accordion-collapseone" data-accordion="collapse">
        {accordionData.slice(0, 7).map((item, index) => (
          <div
            key={index}
            className="relative shadow  rounded-md overflow-hidden mt-4"
          >
            <h2
              className="text-base font-semibold"
              id="accordion-collapse-heading-1"
            >
              <button
                type="button"
                onClick={() => toggleAccordion(index)}
                className={`flex justify-between items-center p-5 w-full font-medium text-start ${
                  activeIndex === index
                    ? "bg-white  text-green-600"
                    : "bg-white"
                }`}
                data-accordion-target="#accordion-collapse-body-1"
                aria-expanded="true"
                aria-controls="accordion-collapse-body-1"
              >
                <span>{item.title}</span>
                <svg
                  data-accordion-icon
                  className={`${
                    activeIndex === index ? "rotate-180" : "rotate-270"
                  } w-4 h-4 shrink-01`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </h2>
            {activeIndex === index && (
              <div>
                <div className="p-5">
                  <p className="text-slate-700 dark:text-gray-400">
                    {item.content}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordion;
