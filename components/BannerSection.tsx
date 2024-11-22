import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdOutlineDoubleArrow } from "react-icons/md";

const BannerSection = () => {
  return (
    <section className="relative">
      <div className="container relative md:mx-auto mx-auto">
        <div className="grid md:grid-cols-12 grid-cols-1 gap-[15px] items-center py-12 relative">
          <div className="md:col-span-8">
            <Link
              href="/calculer-mes-aides"
              title="Je calcule mes aides"
              className="hover:opacity-95 active:opacity-80 relative"
            >
              <Image
                src={`/images/renovation/banner3.webp`}
                width={900}
                height={600}
                className="opacity-100 rounded-md shadow-md"
                alt=""
              />
              <span className="absolute top-[42.5%] left-7 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            </Link>
          </div>
          <div className="md:col-span-2 rounded-md shadow-md h-full flex flex-col justify-between bg-[#F1F5FF] p-6">
            <span className="text-2xl font-bold flex flex-col gap-8">
              Financez Vos Travaux Sans Intérêts
              <span className="w-10 h-1 bg-green-600"></span>
              <span className="text-sm">
                Profitez d’une offre de financement à taux zéro grâce à
                l’éco-PTZ.
              </span>
            </span>
            <Link
              href={"/nos-offres"}
              className="text-lg font-bold hover:text-green-600 flex items-center gap-3 hover:opacity-95 active:opacity-80"
            >
              Découvrir <MdOutlineDoubleArrow size={12} className="mt-0.5" />
            </Link>
          </div>
          <div className="md:col-span-2 rounded-md shadow-md h-full flex flex-col justify-between bg-[#F1F5FF] p-6">
            <span className="text-2xl font-bold flex flex-col gap-8">
              Optimisez Votre Énergie et Économisez!
              <span className="w-10 h-1 bg-green-600"></span>
              <span className="text-sm">
                Réduisez efficacement votre consommation d’énergie et les coûts
                de vos travaux.
              </span>
            </span>
            <Link
              href={"/nos-offres"}
              className="text-lg font-bold hover:text-green-600 flex items-center gap-3 hover:opacity-95 active:opacity-80"
            >
              Découvrir <MdOutlineDoubleArrow size={12} className="mt-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
