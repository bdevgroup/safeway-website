import Image from "next/image";
import Link from "next/link";
import React from "react";
import Accordion from "./ui/Accordion";

const OurOffersSection = () => {
  return (
    <section className="relative md:py-24 py-16 bg-gray-50">
      <div className="container relative">
        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 items-start gap-[30px]">
          <div className="relative mt-10">
            <h3 className="mb-4 md:text-3xl md:leading-normal text-4xl leading-normal font-bold">
              <span className="text-green-600">Nos meilleures </span> offres{" "}
              <br /> pour vous
            </h3>
            <p className="text-slate-800 text-lg max-w-xl mb-3">
              Pour chaque service, nous vous proposons un accompagnement
              complet, de la recherche de financement jusqu’à la finalisation
              des travaux. Nous nous engageons à garantir la qualité des
              matériaux et des travaux ainsi qu’à respecter vos délais, en
              tenant compte de vos contraintes spécifiques.
            </p>
            <Image
              src={`/images/renovation/offre_bg.webp`}
              width={600}
              height={300}
              className="opacity-100 rounded-md shadow-md"
              alt=""
            />

            <div className="mt-6">
              <Link
                href="/calculer-mes-aides"
                className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 text-white me-2 mt-2"
              >
                Je calcule mes aides
              </Link>
            </div>
          </div>

          <Accordion />
        </div>
      </div>
    </section>
  );
};

export default OurOffersSection;
