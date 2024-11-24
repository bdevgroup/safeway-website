import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <section className="relative mt-3">
      <div className="container-fluid relative md:mx-4 mx-2">
        <div className="relative pt-40 pb-24 table w-full rounded-2xl shadow-md overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="image-wrap absolute -top-[350px] -bottom-[350px] -start-[100px] -end-[100px] min-w-full w-auto min-h-full h-auto overflow-hidden m-auto"
              id="home"
              style={{
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                backgroundImage: `url('/images/renovation/bg_home2.webp')`,
              }}
            ></div>
            <Image
              src={`/images/renovation/safeway_logo.png`}
              width={600}
              height={404}
              className="opacity-50 absolute right-10 bottom-2 z-3 mix-blend-screen"
              alt=""
            />
          </div>
          {/* <div className="absolute inset-0 bg-black/20"></div> */}
          <div className="container relative">
            <div className="">
              <div className="flex flex-col justify-center items-center text-center">
                <h1 className="font-bold text-white lg:leading-normal leading-normal text-4xl lg:text-4xl mb-6">
                  SAFEWAY ENGINEERING VOUS ACCOMPAGNE DANS VOS PROJETS DE A à Z
                </h1>
                <p className="text-white text-xl">
                  Optimiser vos économies d’énergie avec nos solutions
                  personnalisées pour vous !
                  <br />
                  Profitez de votre Prime Énergie et accédez à prime CEE et
                  MaPrimeRénov’ pour tous vos projets en un seul geste !
                </p>
                <Link
                  href="/calculer-mes-aides"
                  title="Je calcule mes aides"
                  className={`ml-2 relative z-50 uppercase cursor-pointer mt-16 px-10 py-5 font-bold border align-middle duration-500 text-lg text-center bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 text-white rounded-sm`}
                >
                  Je calcule mes aides
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
