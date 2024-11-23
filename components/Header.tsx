"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Header = ({ navClass, navJustify }: navbarProps) => {
  const [isMenu, setIsMenu] = useState(false);

  const [manu, setMenu] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    setMenu(pathname);
    // console.log("pathname", pathname);
    function windowScroll() {
      const navbar = document.getElementById("topnav");
      if (
        document.body.scrollTop >= 50 ||
        document.documentElement.scrollTop >= 50
      ) {
        if (navbar !== null) {
          navbar?.classList.add("nav-sticky");
        }
      } else {
        if (navbar !== null) {
          navbar?.classList.remove("nav-sticky");
        }
      }
    }
    window.addEventListener("scroll", windowScroll);
    window.scrollTo(0, 0);
    return () => {
      window.removeEventListener("scroll", windowScroll);
    };
  }, [setMenu, pathname]);

  const toggleMenu = () => {
    setIsMenu(!isMenu);
    if (document.getElementById("navigation")) {
      const anchorArray = Array.from(
        document.getElementById("navigation").getElementsByTagName("a")
      );
      anchorArray.forEach((element) => {
        element.addEventListener("click", (elem) => {
          const target = elem.target.getAttribute("href");
          if (target !== "") {
            if (elem.target.nextElementSibling) {
              var submenu = elem.target.nextElementSibling.nextElementSibling;
              submenu.classList.toggle("open");
            }
          }
        });
      });
    }
  };
  return (
    <header>
      <nav
        id="topnav"
        className={`bg-white defaultscroll ${
          navClass === "nav-light"
            ? ""
            : navClass === "nav-sticky"
            ? "bg-black dark:bg-slate-900"
            : ""
        }`}
      >
        <div className="container relative flex text-center justify-between items-center">
          <Link className="logo" href="/">
            <Image
              src={`/images/renovation/safeway_logo.png`}
              width={100}
              height={24}
              className="inline-block dark:hidden mt-3 mb-0"
              alt=""
            />
            <Image
              src={`/images/renovation/safeway_logo.png`}
              width={100}
              height={24}
              className="hidden dark:inline-block mt-3 mb-0"
              alt=""
            />
          </Link>
          <div className="menu-extras md:mt-0 mt-4 md:hidden flex">
            <div className="menu-item">
              <Link
                href="#"
                className={`navbar-toggle ${isMenu ? "open" : ""}`}
                id="isToggle"
                onClick={() => toggleMenu()}
              >
                {isMenu ? <MdClose size={40} /> : <RiMenu5Fill size={40} />}
              </Link>
            </div>
          </div>
          <div
            id="navigation"
            className="md:block hidden"
            style={{ display: isMenu ? "block" : "none" }}
          >
            <ul
              className={`navigation-menu flex items-center gap-5 pt-3 font-bold ${navClass} ${navJustify}`}
            >
              <li
                className={
                  manu === "/" || ""
                    ? "active"
                    : "hover:border-b-2 hover:border-b-green-600"
                }
              >
                <Link href="/" className="sub-menu-item">
                  Accueil
                </Link>
              </li>
              <li
                className={
                  manu === "/calculer-mes-aides"
                    ? "active"
                    : "hover:border-b-2 hover:border-b-green-600"
                }
              >
                <Link
                  href="/calculer-mes-aides"
                  className="sub-menu-item opacity-80 hover:opacity-100"
                >
                  Simulation
                </Link>
              </li>
              <li
                className={
                  manu === "/nos-offres"
                    ? "active"
                    : "hover:border-b-2 hover:border-b-green-600"
                }
              >
                <Link
                  href="/nos-offres"
                  className="sub-menu-item opacity-80 hover:opacity-100"
                >
                  Nos Offres
                </Link>
              </li>
              <li
                className={
                  manu === "/contactez-nous"
                    ? "active"
                    : "hover:border-b-2 hover:border-b-green-600"
                }
              >
                <Link
                  href="/contactez-nous"
                  className="sub-menu-item opacity-80 hover:opacity-100"
                >
                  Contactez-nous
                </Link>
              </li>
              <li className={manu === "/prendre-rendez-vous" ? "active" : ""}>
                <PopUpPrendreRDV telephone="" />
              </li>
            </ul>
          </div>
          <div
            id="navigation"
            className="md:hidden z-999 fixed left-0 top-0 w-full h-screen bg-white"
            style={{ display: isMenu ? "flex" : "none" }}
          >
            <Link
              href="#"
              className="navbar-toggle absolute right-12 top-6"
              id="isToggle"
              onClick={() => toggleMenu()}
            >
              <MdClose size={40} />
            </Link>
            <ul
              className={`navigation-menu flex -mt-40 flex-col w-full justify-center items-center gap-5 font-bold`}
            >
              <li
                className={
                  manu === "/" || ""
                    ? "active"
                    : "hover:border-b-2 hover:border-b-green-600"
                }
              >
                <Link
                  onClick={() => setIsMenu(false)}
                  href="/"
                  className="sub-menu-item text-4xl font-light"
                >
                  Accueil
                </Link>
              </li>
              <li
                className={
                  manu === "/calculer-mes-aides"
                    ? "active"
                    : "hover:border-b-2 hover:border-b-green-600"
                }
              >
                <Link
                  onClick={() => setIsMenu(false)}
                  href="/calculer-mes-aides"
                  className="sub-menu-item text-4xl font-light opacity-80 hover:opacity-100"
                >
                  Simulation
                </Link>
              </li>
              <li
                className={
                  manu === "/nos-offres"
                    ? "active"
                    : "hover:border-b-2 hover:border-b-green-600"
                }
              >
                <Link
                  onClick={() => setIsMenu(false)}
                  href="/nos-offres"
                  className="sub-menu-item text-4xl font-light opacity-80 hover:opacity-100"
                >
                  Nos Offres
                </Link>
              </li>
              <li
                className={
                  manu === "/contactez-nous"
                    ? "active"
                    : "hover:border-b-2 hover:border-b-green-600"
                }
              >
                <Link
                  onClick={() => setIsMenu(false)}
                  href="/contactez-nous"
                  className="sub-menu-item text-4xl font-light opacity-80 hover:opacity-100"
                >
                  Contactez-nous
                </Link>
              </li>
              <li
                onClick={() => setIsMenu(false)}
                className={manu === "/prendre-rendez-vous" ? "active" : ""}
              >
                {/* <PopUpPrendreRDV telephone="" /> */}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
