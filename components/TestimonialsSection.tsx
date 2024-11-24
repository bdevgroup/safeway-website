"use client";
import React from "react";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import { clientsData } from "@/constants";
import { FaStar } from "react-icons/fa";

const TestimonialsSection = () => {
  //   const handleDragStart = (e: React.FormEvent<Element>) => e.preventDefault();

  const items = clientsData.map((item, index) => (
    <div className="tiny-slide text-center relative" key={index}>
      <div className="cursor-e-resize">
        <div className="content relative shadow m-2 p-6 bg-white before:content-[''] before:absolute before:start-1/2 before:-bottom-[4px] before:box-border before:border-8 before:rotate-[45deg] before:border-t-transparent before:border-e-white before:border-b-white before:border-s-transparent before:shadow-gray-400 dark:before:shadow-gray-700 before:origin-top-left">
          <i className="mdi mdi-format-quote-open mdi-48px text-indigo-600"></i>
          <p className="text-blue-900 text-base">{item.description}</p>
          <ul className="list-none mb-0 text-amber-400 mt-3 flex justify-center gap-1 space-x-1">
            {Array.from({ length: item.stars }, (_, i) => (
              <li className="inline" key={i}>
                <FaStar />
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center mt-5">
          <h6 className="mt-2 font-semibold">{item.name}</h6>
        </div>
      </div>
    </div>
  ));
  const Gallery = () => (
    <AliceCarousel
      responsive={{
        0: {
          items: 1,
        },
        1024: {
          items: 3,
          itemsFit: "contain",
        },
      }}
      mouseTracking
      items={items}
    />
  );

  return (
    <section className="relative md:py-24 py-16">
      <div className=" relative">
        <div className="container testimonials-container relative" id="review">
          <div className="grid grid-cols-1 pb-8 text-center">
            <h6 className="text-indigo-600 text-base mb-2">Témoignage</h6>
            <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">
              Clients satisfaits
            </h3>
          </div>
          <div className="grid grid-cols-1 mt-8">
            <div className="tiny-three-item">
              <Gallery />
              {/*  */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
