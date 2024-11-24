import { consultingService } from "@/constants";
import Image from "next/image";
import React from "react";

const WhyChooseUsSection = () => {
  return (
    <section className="relative md:py-12 py-12">
      <div className="container relative">
        <div className="grid grid-cols-1 pb-8 text-center">
          <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-bold">
            Pourquoi choisir Safeway Engineering ?
          </h3>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 mt-8 gap-[10px]">
          {consultingService.map((item, index) => {
            return (
              <div className="group relative p-3" key={index}>
                <div className="relative shadow-2xl shadow-slate-200 rounded-2xl overflow-hidden">
                  <Image
                    src={item.image}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }}
                    className=""
                    alt=""
                  />
                  <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 duration-500 ease-in-out"></div>
                </div>

                <div className="mt-6">
                  <span className="text-xl font-semibold hover:text-green-600 transition-all duration-500 ease-in-out">
                    {item.title}
                  </span>
                  <p className="text-slate-800 mt-4">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
