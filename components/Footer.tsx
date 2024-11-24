"use client";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useCallback } from "react";
import { BiCheckDouble } from "react-icons/bi";
import { BsMailbox } from "react-icons/bs";

const NewsletterForm = ({
  onSubmit,
  email,
  onChangeEmail,
  loading,
  showConfirmationMsg,
}: newsletterFormProps) => (
  <>
    {showConfirmationMsg ? (
      <div className="text-center mt-2 bg-white/5 p-3 rounded-md flex gap-2">
        <BiCheckDouble size={25} color="green" /> Your email has been sent
        successfully.
      </div>
    ) : (
      <form onSubmit={onSubmit} autoComplete="off">
        <div className="grid grid-cols-1">
          <div className="foot-subscribe my-3">
            <div className="form-icon relative mt-2">
              <BsMailbox className="w-4 h-4 absolute top-3 start-4" />
              <input
                type="email"
                className="form-input ps-12 rounded w-full py-2 px-3 h-10 bg-gray-800 border-0 text-gray-100 focus:shadow-none focus:ring-0"
                placeholder="E-mail"
                name="email"
                value={email}
                onChange={onChangeEmail}
                required
              />
            </div>
          </div>
          <Button
            color="primary"
            type="submit"
            className="bg-indigo-600 rounded-md"
            isLoading={loading}
          >
            Subscribe
          </Button>
        </div>
      </form>
    )}
  </>
);

const Footer = () => {
  const [formState, setFormState] = useState({
    loading: false,
    showConfirmationMsg: false,
    email: "",
  });

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, email: e.target.value }));
  };

  const handleSubmitNewsletter = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setFormState((prev) => ({ ...prev, loading: true }));

      const reqBody = { email: formState.email };
      console.log("reqBody", reqBody);

      try {
        const res = await fetch("/api/submitNewsletter/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        });
        if (res.ok) {
          console.log("Form submitted successfully");
          setFormState({
            loading: false,
            showConfirmationMsg: true,
            email: "",
          });
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        setFormState((prev) => ({ ...prev, loading: false }));
      }
    },
    [formState.email]
  );

  return (
    <footer className="footer bg-slate-800 relative text-gray-200 dark:text-gray-200 mb-[80px]">
      <div className="container relative">
        <div className="grid grid-cols-12">
          <div className="col-span-12">
            <div className="pt-5 px-0">
              <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
                <div className="lg:col-span-5 md:col-span-12">
                  <Link href="/" className="text-[22px] focus:outline-none">
                    <Image
                      src={`/images/renovation/safeway_logo.png`}
                      width={138}
                      height={24}
                      alt="Safeway Logo"
                      className="mix-blend-lighten"
                    />
                  </Link>
                  <p className="mt-6 text-gray-300">
                    SAFEWAY bureau d’étude et travaux, spécialisé dans les
                    études techniques et les travaux de rénovation.
                  </p>
                </div>
                <div className="lg:col-span-4 md:col-span-12"></div>
                <div className="lg:col-span-3 md:col-span-4">
                  <h5 className="tracking-[1px] text-gray-100 font-semibold">
                    Newsletter
                  </h5>
                  <p className="mt-6">
                    Inscrivez-vous pour recevoir les derniers conseils par
                    e-mail.
                  </p>
                  <NewsletterForm
                    onSubmit={handleSubmitNewsletter}
                    loading={formState.loading}
                    showConfirmationMsg={formState.showConfirmationMsg}
                    onChangeEmail={handleChangeEmail}
                    email={formState.email}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-0 py-3 border-t border-slate-800">
        <div className="container relative text-center">
          <div className="grid md:grid-cols-2 items-center">
            <div className="md:text-start text-center">
              <p className="mb-0">
                © {new Date().getFullYear()} This site is developed by{" "}
                <Link
                  href="https://liadtech.fr/"
                  target="_blank"
                  className="text-reset"
                >
                  Liadtech
                </Link>
                .
              </p>
            </div>
            <div className="sub-menu-item text-right text-white">
              Pour plus d’informations, contactez-nous:{" "}
              <span className="font-bold text-blue-300 border-b border-gray-800">
                contact@safewayrenovation.fr
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
