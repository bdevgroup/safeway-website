import SimulationForm from "@/components/SimulationForm";
import { projetStepData } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

const Page = () => {
  const handleChildData = () => {
    window.scrollTo(0, 0);
  };
  return (
    <section className="relative lg:pb-32 lg:pt-10 pb-32 mt-4 pt-10 bg-slate-900/5 bg-center bg-cover">
      <div className="container">
        <div className="flex justify-start items-center mb-3">
          <ul className="tracking-[0.5px] mb-0 inline-flex space-x-1 items-center align-middle">
            <li className="inline-block text-[13px] font-normal duration-500 ease-in-out hover:text-green-600">
              <Link href="/">Accueil</Link>
            </li>
            <li className="inline-block text-base mx-0.5 ltr:rotate-0 rtl:rotate-180">
              <MdKeyboardArrowRight className="text-xl" />
            </li>
            <li className="inline-block text-[13px] font-bold duration-500 ease-in-out hover:text-green-600">
              <span>Simulateur</span>
            </li>
            <li className="inline-block text-base mx-0.5 ltr:rotate-0 rtl:rotate-180">
              <MdKeyboardArrowRight className="text-xl" />
            </li>
            <li
              className="inline-block text-[13px] font-bold duration-500 ease-in-out text-green-600"
              aria-current="page"
            >
              Votre simulation
            </li>
          </ul>
        </div>
        <div className="grid md:grid-cols-12 grid-cols-1 gap-[15px]">
          <div className="md:col-span-3 md:block hidden">
            <div className="mt-8 shadow-sm rounded-md bg-white mb-10">
              <div className="border-b-2 border-slate-50 p-5 font-bold text-xl leading-tight">
                Obtenez votre prime énergie
                <br />
                en 4 étapes
              </div>
              {projetStepData.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="group relative lg:px-2 transition-all duration-500 ease-in-out rounded-md bg-white dark:bg-slate-900 overflow-hidden"
                  >
                    <div className="flex items-center gap-5 px-5 py-8 border-b-2 border-slate-50">
                      <Image
                        src={item.image}
                        width={50}
                        height={50}
                        className=""
                        alt={item.title}
                      />{" "}
                      <h5 className="text-base font-semibold leading-tight">
                        {item.title}
                      </h5>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mb-10">
              <Link href={"/nos-offres"} title="Offre Financement">
                <Image
                  src={`/images/renovation/consomation_energie.webp`}
                  width={400}
                  height={300}
                  className="opacity-100 rounded-md shadow-md"
                  alt=""
                />
              </Link>
            </div>
            <Link href={"/nos-offres"} title="Offre Bienvenue">
              <Image
                src={`/images/renovation/offre_bienvenue3.webp`}
                width={400}
                height={300}
                className="opacity-100 rounded-md shadow-md"
                alt=""
              />
            </Link>
          </div>
          <div className="md:col-span-9 pt-2 ps-5">
            <SimulationForm onDataChange={handleChildData} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
