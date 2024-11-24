"use client";
import { menuItems } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import { MdClose } from "react-icons/md";
import { RiMenu5Fill } from "react-icons/ri";

const Header = ({ navClass, navJustify }: navbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById("topnav");
      if (navbar) {
        if (window.scrollY >= 50) {
          navbar.classList.add("nav-sticky");
        } else {
          navbar.classList.remove("nav-sticky");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
              alt="Safeway Logo"
            />
            <Image
              src={`/images/renovation/safeway_logo.png`}
              width={100}
              height={24}
              className="hidden dark:inline-block mt-3 mb-0"
              alt="Safeway Logo"
            />
          </Link>
          <div className="menu-extras md:mt-0 mt-4 md:hidden flex">
            <div className="menu-item">
              <button
                className={`navbar-toggle ${isMenuOpen ? "open" : ""}`}
                onClick={toggleMenu}
                aria-label="Toggle navigation menu"
              >
                {isMenuOpen ? <MdClose size={40} /> : <RiMenu5Fill size={40} />}
              </button>
            </div>
          </div>
          <div className={`md:block ${isMenuOpen ? "block" : "hidden"}`}>
            <ul
              className={`navigation-menu flex items-center gap-5 pt-3 font-bold ${navClass} ${navJustify}`}
            >
              {menuItems.map((item) => (
                <li
                  key={item.href}
                  className={
                    pathname === item.href
                      ? "active"
                      : "hover:border-b-2 hover:border-b-green-600"
                  }
                >
                  <Link href={item.href} className="sub-menu-item">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
