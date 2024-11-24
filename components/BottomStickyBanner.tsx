"use client";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";

// Component to render a bottom sticky banner with scroll-based animation
const BottomStickyBanner: React.FC = () => {
  //   const [isFixed, setIsFixed] = useState<boolean>(false); // Whether the banner is fixed at the bottom
  const [scrollY, setScrollY] = useState<number>(0); // Track the scroll position

  const scrollThreshold = 300; // Threshold to trigger the banner's appearance

  // Scroll event handler, adjusts the scrollY state
  const onScroll = useCallback(() => {
    setScrollY(window.pageYOffset);
  }, []);

  // Effect hook to set up and clean up the scroll event listener
  useEffect(() => {
    const handleScroll = () => onScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll, {});
    };
  }, [onScroll]);

  return (
    <div
      className={`bg-slate-900 transition-transform duration-300 ${
        scrollY >= scrollThreshold ? "translate-y-0" : "translate-y-full"
      } md:block simulation-bare hidden border-t-2 p-5 py-2 border-green-600 text-white fixed bottom-0 left-0 z-999 w-screen min-h-20`}
    >
      <div className="container">
        <div className="flex justify-center items-center gap-20">
          <div>
            <h3 className="text-lg font-bold">
              Financez jusqu’à 100% du coût de vos travaux!
            </h3>
            <p className="font-light">
              Avec la Prime CEE et MaPrimeRénov’, réduire sa facture de
              chauffage n’a jamais été aussi facile !
            </p>
          </div>
          <Link
            href="/calculer-mes-aides"
            title="Je calculer mais aides"
            className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 text-white me-2 mt-2"
          >
            Je calcule mes aides
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BottomStickyBanner;
