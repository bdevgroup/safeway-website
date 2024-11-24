import { projetStepData } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdHexagon } from "react-icons/md";

const ProjectProcessSection = () => {
  return (
    <section className="bg-slate-50 relative md:mt-6 md:mb-6 mt-6 py-12">
      <div className="container">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-[30px]">
          {projetStepData.map((item, index) => {
            return (
              <div
                key={index}
                className="group relative lg:px-2 transition-all duration-500 ease-in-out rounded-md bg-slate-50 overflow-hidden text-center"
              >
                <div className="relative overflow-hidden text-transparent -m-3">
                  <MdHexagon className="h-40 w-40 fill-green-600/5 mx-auto" />
                  <div className="absolute top-2/4 -translate-y-2/4 start-0 end-0 mx-auto text-green-600 rounded-md transition-all duration-500 ease-in-out text-4xl flex align-middle justify-center items-center">
                    <Image
                      src={item.image}
                      width={100}
                      height={100}
                      className=""
                      alt={item.title}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <h5 className="text-lg font-bold">{item.title}</h5>
                  <p className="text-black mt-3 text-sm">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center items-center mt-10">
          <Link
            href="/calculer-mes-aides"
            className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 text-white me-2 mt-2"
          >
            Je calcule mes aides
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectProcessSection;
