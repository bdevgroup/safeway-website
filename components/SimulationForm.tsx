"use client";
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import Image from "next/image";
import { Oval } from "react-loader-spinner";
import { DevisCalculeResultatV3 } from "./devisCalculeResultatV3";
import { Checkbox, Input } from "@nextui-org/react";

import { leadService } from "../../services/leadService";
const SimulationForm = ({ onDataChange }) => {
//   const [selectedColor, setSelectedColor] = useState("success");
  const [descriptifTravaux, setDescriptifTravaux] = useState("");

//   const [loading, setLoading] = useState(false);
  const [isParrainageSelected, setIsParrainageSelected] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [showCalculeResultat, setShowCalculeResultat] = useState(false);
  const [calculeResultat, setCalculeResultat] = useState(null);
  const [insertedLeadID, setInsertedLeadID] = useState(null);
//   const [showConfirmationMsg, setShowConfirmationMsg] = useState(false);
//   const [showConfirmationMsgDetail, setShowConfirmationMsgDetail] = useState(false);
  const [eligible, setEligible] = useState(false);
  const [typeRessources, setTypeRessources] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [telephoneParrain, setTelephoneParrain] = useState("");
  const [email, setEmail] = useState("");
  const [adresse, setAdresse] = useState("");
  const [pays, setPays] = useState("France");
  const [ville, setVille] = useState("");
  const [codePostal, setCodePostal] = useState("");

  const [typeDeBien, setTypeDeBien] = useState("");
  const [anneDeContruction, setAnneDeContruction] = useState("");
  const [typeDeBienAutreShow, setTypeDeBienAutreShow] = useState(false);
  const [typeDeChauffageAutreShow, setTypeDeChauffageAutreShow] =
    useState(false);
  const [typeDeBienAutre, setTypeDeBienAutre] = useState("");
  const [typeDeChauffage, setTypeDeChauffage] = useState("");
  const [typeDeChauffageAutre, setTypeDeChauffageAutre] = useState("");
  const [delai, setDelai] = useState("");
  const [superficie, setSuperficie] = useState("");
  const [revenue, setRevenue] = useState("");
  const [nbrePersonAutre, setNbrePersonAutre] = useState("");
  const [nbrePerson5Plus, setNbrePerson5Plus] = useState(false);
  const [nbrePerson, setNbrePerson] = useState("");
  const [dpe, setDpe] = useState("");
  const [revenueList, setRevenueList] = useState([]);
  const [typeTime, setTypeTime] = useState("");
  const [calendarDate, onCalendarChange] = useState("");
  const [typeDeBienList, setTypeDeBienList] = useState([
    {
      icon: "/images/renovation/005-house.png",
      value: "Maison",
    },
    {
      icon: "/images/renovation/003-office-building.png",
      value: "Appartement",
    },
    {
      icon: "/images/renovation/004-building-1.png",
      value: "Immeuble / Copropriété",
    },
    {
      icon: "/images/renovation/002-resort.png",
      value: "Hotel",
    },
    {
      icon: "/images/renovation/001-building.png",
      value: "Gites",
    },
    {
      icon: "/images/renovation/working.png",
      value: "Copropriété",
    },
  ]);
  const [chauffageList, setChauffageList] = useState([
    {
      type: "Raccordement à un réseau de chaleur et/ou de froid",
      primeRenovTresModeste: 1200,
      primeRenovModeste: 800,
      primeRenovInter: 400,
      primeRenovSupper: "non éligible",
      depensePrevionnelle: 1800,
    },
    {
      type: "Chauffe-eau thermodynamique",
      primeRenovTresModeste: 1200,
      primeRenovModeste: 800,
      primeRenovInter: 400,
      primeRenovSupper: "non éligible",
      depensePrevionnelle: 3500,
    },
    {
      type: "Pompe à chaleur air/eau (dont PAC hybrides)",
      primeRenovTresModeste: 5000,
      primeRenovModeste: 4000,
      primeRenovInter: 3000,
      primeRenovSupper: "non éligible",
      depensePrevionnelle: 12000,
    },
    {
      type: "Pompe à chaleur géothermique ou solarothermique (dont PAC hybrides)",
      primeRenovTresModeste: 11000,
      primeRenovModeste: 9000,
      primeRenovInter: 6000,
      primeRenovSupper: "non éligible",
      depensePrevionnelle: 18000,
    },
    {
      type: "Chauffe-eau solaire individuel en Métropole (et dispositifs solaires pour le chauffage de l’eau)",
      primeRenovTresModeste: 4000,
      primeRenovModeste: 3000,
      primeRenovInter: 2000,
      primeRenovSupper: "non éligible",
      depensePrevionnelle: 7000,
    },
    {
      type: "Système solaire combiné (et dispositifs solaires pour le chauffage des locaux)",
      primeRenovTresModeste: 10000,
      primeRenovModeste: 8000,
      primeRenovInter: 4000,
      primeRenovSupper: "non éligible",
      depensePrevionnelle: 16000,
    },
    {
      type: "Partie thermique d’un équipement PVT eau (système hybride photovoltaïque et thermique)",
      primeRenovTresModeste: 2500,
      primeRenovModeste: 2000,
      primeRenovInter: 1000,
      primeRenovSupper: "non éligible",
      depensePrevionnelle: 4000,
    },
    {
      type: "Poêle à bûches et cuisinière à bûches",
      // primeRenovTresModeste: 2500,
      primeRenovTresModeste: 1800,
      // primeRenovModeste: 2000,
      primeRenovModeste: 1500,
      // primeRenovInter: 1000,
      primeRenovInter: 700,
      primeRenovSupper: "non éligible",
      depensePrevionnelle: 4000,
    },
    {
      type: "Poêle à granulés et cuisinière à granulés",
      // primeRenovTresModeste: 2500,
      primeRenovTresModeste: 1800,
      // primeRenovModeste: 2000,
      primeRenovModeste: 1500,
      // primeRenovInter: 1500,
      primeRenovInter: 1000,
      primeRenovSupper: "non éligible",
      depensePrevionnelle: 5000,
    },
    {
      type: "Chaudière bois à alimentation manuelle (bûches)",
      // primeRenovTresModeste: 8000,
      primeRenovTresModeste: 5500,
      // primeRenovModeste: 6500,
      primeRenovModeste: 4500,
      // primeRenovInter: 3000,
      primeRenovInter: 2000,
      primeRenovSupper: "non éligible",
      depensePrevionnelle: 16000,
    },
    {
      type: "Chaudière bois à alimentation automatique (granulés, plaquettes)",
      // primeRenovTresModeste: 10000,
      primeRenovTresModeste: 7000,
      // primeRenovModeste: 8000,
      primeRenovModeste: 5500,
      // primeRenovInter: 4000,
      primeRenovInter: 3000,
      primeRenovSupper: "non éligible",
      depensePrevionnelle: 18000,
    },
    {
      type: "Foyer fermé et insert à bûches ou à granulés",
      // primeRenovTresModeste: 2500,
      primeRenovTresModeste: 1800,
      // primeRenovModeste: 1500,
      primeRenovModeste: 1000,
      // primeRenovInter: 800,
      primeRenovInter: 600,
      primeRenovSupper: "non éligible",
      depensePrevionnelle: 4000,
    },
  ]);
  const [AUTRESTRAVAUXList, setAUTRESTRAVAUXList] = useState([
    {
      type: "Audit énergétique hors obligation réglementaire (conditionné à la réalisation d’un geste de travaux)",
      primeRenovTresModeste: 500,
      primeRenovModeste: 400,
      primeRenovInter: 300,
      primeRenovSupper: "non éligible",
      depensePrevionnelle: 800,
    },
    {
      type: "Dépose de cuve à fioul",
      primeRenovTresModeste: 1200,
      primeRenovModeste: 800,
      primeRenovInter: 400,
      primeRenovSupper: "non éligible",
      depensePrevionnelle: 4000,
    },
    {
      type: "Ventilation double flux",
      primeRenovTresModeste: 2500,
      primeRenovModeste: 2000,
      primeRenovInter: 1500,
      primeRenovSupper: "non éligible",
      depensePrevionnelle: 6000,
    },
  ]);
  const componentRef = useRef(null);
  const onBeforeGetContentResolve = useRef(null);
  const [loadingPrint, setLoadingPrint] = useState(false);

  // Validation d'email
  const isInvalid = useMemo(() => {
    const validateEmail = (email) =>
      email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    if (email === "") return false;

    return validateEmail(email) ? false : true;
  }, [email]);
  const isInvalidPhone = useMemo(() => {
    const regexTelephoneFrancais = /^(?:\+33|0)[1-9](?:[\s.-]?\d{2}){4}$/i;
    const validatePhone = (telephone) =>
      telephone.match(regexTelephoneFrancais);
    if (telephone === "") return false;

    return validatePhone(telephone) ? false : true;
  }, [telephone]);
  const isInvalidPhoneParrain = useMemo(() => {
    const regexTelephoneFrancais = /^(?:\+33|0)[1-9](?:[\s.-]?\d{2}){4}$/i;
    const validatePhone = (telephone) =>
      telephone.match(regexTelephoneFrancais);
    if (telephoneParrain === "") return false;

    return validatePhone(telephoneParrain) ? false : true;
  }, [telephoneParrain]);

  const [text, setText] = useState("old boring text");
  const handleAfterPrint = useCallback(() => {
    // console.log("`onAfterPrint` called");
  }, []);
  const handleBeforePrint = useCallback(() => {
    // console.log("`onBeforePrint` called");
  }, []);
  const handleOnBeforeGetContent = useCallback(() => {
    // console.log("`onBeforeGetContent` called");
    setLoadingPrint(true);
    setText("Loading new text...");

    return new Promise((resolve) => {
      onBeforeGetContentResolve.current = resolve;

      setTimeout(() => {
        setLoadingPrint(false);
        setText("New, Updated Text!");
        resolve();
      }, 2000);
    });
  }, [setLoadingPrint, setText]);

  useEffect(() => {
    if (showCalculeResultat) {
      onDataChange(true);
    }
  }, [showCalculeResultat, onDataChange]);
  useEffect(() => {
    if (
      anneDeContruction === ">15ans" ||
      (anneDeContruction === "2ans<>15ans" && typeDeChauffage === "Fioul")
    ) {
      // console.log("éligible pour l'aide");
      setEligible(true);
    } else {
      // console.log("n'est pas éligible pour l'aide");
      setEligible(false);
    }
    let revenueIndex = revenueList.findIndex((r) => r.value === revenue);
    if (revenueIndex === 0) {
      setTypeRessources("TRÈS MODESTES");
      // console.log("TRÈS MODESTES");
    } else if (revenueIndex === 1) {
      setTypeRessources("MODESTES");
      // console.log("MODESTES");
    } else if (revenueIndex === 2) {
      setTypeRessources("INTERMÉDIAIRES");
      // console.log("INTERMÉDIAIRES");
    } else {
      setTypeRessources("SUPÉRIEURES");
      // console.log("SUPÉRIEURES");
    }
    setCalculeResultat(
      JSON.stringify({
        eligible,
        typeRessources,
        chauffageList,
        AUTRESTRAVAUXList,
        telephone,
        insertedLeadID,
      })
    );
  }, [
    typeRessources,
    chauffageList,
    AUTRESTRAVAUXList,
    eligible,
    revenueList,
    anneDeContruction,
    typeDeChauffage,
    revenue,
    telephone,
    insertedLeadID,
  ]);
  useEffect(() => {
    if (
      text === "New, Updated Text!" &&
      typeof onBeforeGetContentResolve.current === "function"
    ) {
      onBeforeGetContentResolve.current();
    }
    if (typeDeBien === "Autre") {
      setTypeDeBienAutreShow(true);
    } else {
      setTypeDeBienAutreShow(false);
    }
    if (typeDeChauffage === "Autre") {
      setTypeDeChauffageAutreShow(true);
    } else {
      setTypeDeChauffageAutreShow(false);
    }

    if (nbrePerson === "5+") {
      setNbrePerson5Plus(true);
    } else {
      setNbrePerson5Plus(false);
    }
    switch (nbrePerson) {
      case "1":
        setRevenueList([
          { label: "23 541 €", value: "23541" },
          { label: "28 657 €", value: "28657" },
          { label: "40 018 €", value: "40018" },
          { label: "supérieur à 40 018 €", value: ">40018" },
        ]);
        break;
      case "2":
        setRevenueList([
          { label: "34 551 €", value: "34551" },
          { label: "42 058 €", value: "42058" },
          { label: "58 827 €", value: "58827" },
          { label: "supérieur à 58 827 €", value: ">58827" },
        ]);
        break;
      case "3":
        setRevenueList([
          { label: "41 493 €", value: "41493" },
          { label: "50 513 €", value: "50513" },
          { label: "70 382 €", value: "70382" },
          { label: "supérieur à 70 382 €", value: ">70382" },
        ]);
        break;
      case "4":
        setRevenueList([
          { label: "48 447 €", value: "48447" },
          { label: "58 981 €", value: "58981" },
          { label: "82 839 €", value: "82839" },
          { label: "supérieur à 82 839 €", value: ">82839" },
        ]);
        break;
      case "5":
        setRevenueList([
          { label: "55 427 €", value: "55427" },
          { label: "67 473 €", value: "67473" },
          { label: "94 844 €", value: "94844" },
          { label: "supérieur à 94 844 €", value: ">94844" },
        ]);
        break;
      case "5+":
        setRevenueList([
          { label: "55 427 €", value: "55427" },
          { label: "67 473 €", value: "67473" },
          { label: "94 844 €", value: "94844" },
          { label: "supérieur à 94 844 €", value: ">94844" },
        ]);
        break;
      default:
    }
    nbrePerson;
  }, [typeDeBien, typeDeChauffage, nbrePerson, text]);

  const reactToPrintContent = useCallback(() => {
    return componentRef.current;
  }, [componentRef]);

  const documentTitle = "Safewaya Engineering Devis";
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${documentTitle}.pdf`,
    copyStyles: true,
  });
  const handleDownload = useReactToPrint({
    content: () => componentRef.current,
    onPrintError: (error) => console.log(error),
    removeAfterPrint: true,
    documentTitle: `${documentTitle}.pdf`,
    print: async (printIframe) => {
      const document = printIframe.contentDocument;
      if (document) {
        const html = document.getElementById("element-to-download-as-pdf");
        // console.log(html);
        const exporter = new Html2Pdf(html, {
          filename: `${documentTitle}.pdf`,
        });
        exporter.getPdf(true);
      }
    },
  });
  const handleCalculeDevis = () => {
    setShowCalculeResultat(true);
  };
  const handleSubmitDetail = async (e) => {
    e.preventDefault();
    setLoadingDetail(true);
    const lead = {
      nom,
      prenom,
      telephone,
      email,
      adresse,
      pays,
      ville,
      codePostal,
      isParrainageSelected,
      telephoneParrain,
      typeDeBien,
      anneDeContruction,
      typeDeChauffage,
      typeDeBienAutre,
      delai,
      superficie,
      revenue,
      nbrePerson,
      descriptifTravaux,
      dpe,
      calendarDate,
      typeTime,
      leadType: "detail",
    };
    try {
      const res = await leadService.createLead(lead);
      // console.log("res", res);
      setInsertedLeadID(res.id);
      handleCalculeDevis();
      setLoadingDetail(false);
      if (process.env.NEXT_PUBLIC_ENV === "prod") {
        gtag("event", "conversion", {
          send_to: process.env.NEXT_PUBLIC_CONVERSION,
          value: 1.0,
          currency: "EUR",
          event_callback: () => {
            console.log("Conversion suivie avec succès.");
          },
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoadingDetail(false);
    }
  };
  return (
    <>
      <div className="mt-6 flex rounded-md shadow-md bg-slate-100 text-lg font-semibold">
        <div
          className={`p-6 ${
            showCalculeResultat
              ? "opacity-50"
              : "bg-white rounded-s-md rounded-l-md text-green-600"
          }`}
        >
          1. Votre simulation
        </div>
        <div
          className={`p-6 ${
            showCalculeResultat
              ? "bg-white rounded-s-md rounded-l-md text-green-600"
              : "opacity-50"
          }`}
        >
          2. Vos résultats
        </div>
      </div>
      <div
        className={`mt-3 relative py-6 px-10 rounded-md bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-800`}
      >
        {showCalculeResultat ? (
          ""
        ) : (
          <div className="mb-6 text-left py-6">
            <h3 className="text-4xl font-bold mb-5">
              Simulez votre prime énergie pour votre bien
            </h3>
            <p className="text-black text-lg">
              Pour recevoir un devis express instantané, veuillez remplir le
              formulaire suivant
            </p>
          </div>
        )}

        {showCalculeResultat ? (
          <DevisCalculeResultatV3 ref={componentRef} data={calculeResultat} />
        ) : (
          ""
        )}
        <form
          onSubmit={
            nom === "" || prenom === "" || telephone === "" || isInvalidPhone
              ? undefined
              : (e) => handleSubmitDetail(e)
          }
          autoComplete="off"
        >
          {showCalculeResultat ? (
            <>
              <div className="flex justify-center items-center gap-5 py-5 mt-12">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="bg-sky-500 px-5 hidden cursor-pointer py-2 text-white rounded-md"
                >
                  Telecharger PDF
                </button>
                <ReactToPrint
                  content={reactToPrintContent}
                  documentTitle="Safewaya Engineering Devis"
                  onAfterPrint={handleAfterPrint}
                  onBeforeGetContent={handleOnBeforeGetContent}
                  onBeforePrint={handleBeforePrint}
                  removeAfterPrint
                />
                {loadingPrint && (
                  <p className="indicator">onBeforeGetContent: Loading...</p>
                )}
                <button
                  type="button"
                  onClick={handlePrint}
                  className="border bg-sky-500 text-white border-sky-500 px-5 cursor-pointer py-2  rounded-md"
                >
                  Imprimer le devis
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1">
                <div className="py-4">
                  <h6 className="font-bold text-xl">1. Vos Coordonnées</h6>
                </div>
                <div className="step1_info">
                  <div className="grid md:grid-cols-2 gap-3 mb-3">
                    <div className="">
                      <input
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        className="form-input w-full py-2 px-3 h-12 bg-white dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-green-600 dark:border-gray-800 dark:focus:border-green-600 focus:ring-0"
                        placeholder="Nom*"
                        name="nom"
                        required
                      />
                    </div>
                    <div className="">
                      <input
                        type="text"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        className="form-input w-full py-2 px-3 h-12 bg-white dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-green-600 dark:border-gray-800 dark:focus:border-green-600 focus:ring-0"
                        placeholder="Prénom*"
                        name="prenom"
                        required
                      />
                    </div>

                    <div className="">
                      <Input
                        value={telephone}
                        variant="bordered"
                        placeholder="Téléphone*"
                        radius="none"
                        size="lg"
                        required
                        isInvalid={isInvalidPhone}
                        color={isInvalidPhone ? "danger" : ""}
                        errorMessage={
                          isInvalidPhone &&
                          "Veuillez saisir un téléphone valide"
                        }
                        onValueChange={setTelephone}
                        className="bg-white shadow-none shadow-transparent"
                      />
                    </div>
                    <div className="">
                      <Input
                        value={email}
                        type="email"
                        variant="bordered"
                        placeholder="Email"
                        radius="none"
                        size="lg"
                        isInvalid={isInvalid}
                        color={isInvalid ? "danger" : ""}
                        errorMessage={
                          isInvalid && "Veuillez saisir un email valide"
                        }
                        onValueChange={setEmail}
                        className="bg-white shadow-none shadow-transparent"
                      />
                    </div>
                  </div>
                </div>
                <div className="">
                  <textarea
                    id="adresse"
                    name="adresse"
                    defaultValue={adresse}
                    onChange={(e) => setAdresse(e.target.value)}
                    placeholder="Adresse"
                    className="form-input w-full py-2 px-3 bg-white dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-sky-600 dark:border-gray-800 dark:focus:border-sky-600 focus:ring-0"
                  ></textarea>
                </div>
                <div className="grid md:grid-cols-3 gap-3 mb-3">
                  <div className="">
                    <input
                      type="text"
                      value={codePostal}
                      onChange={(e) => setCodePostal(e.target.value)}
                      className="form-input w-full py-2 px-3 h-12 bg-white dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-sky-600 dark:border-gray-800 dark:focus:border-sky-600 focus:ring-0"
                      placeholder="Code Postal"
                      name="codePostal"
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      value={ville}
                      onChange={(e) => setVille(e.target.value)}
                      className="form-input w-full py-2 px-3 h-12 bg-white dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-sky-600 dark:border-gray-800 dark:focus:border-sky-600 focus:ring-0"
                      placeholder="Ville"
                      name="ville"
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      value={pays}
                      onChange={(e) => setPays(e.target.value)}
                      className="form-input w-full py-2 px-3 h-12 bg-white dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-sky-600 dark:border-gray-800 dark:focus:border-sky-600 focus:ring-0"
                      placeholder="Pays"
                      name="pays"
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-2 py-2 flex items-center gap-3">
                    <Checkbox
                      isSelected={isParrainageSelected}
                      onValueChange={setIsParrainageSelected}
                    >
                      Parrainage
                    </Checkbox>
                    <Input
                      value={telephoneParrain}
                      variant="bordered"
                      placeholder="Téléphone du parrain"
                      radius="none"
                      size="lg"
                      isInvalid={isInvalidPhoneParrain}
                      color={isInvalidPhoneParrain ? "danger" : ""}
                      errorMessage={
                        isInvalidPhoneParrain &&
                        "Veuillez saisir un téléphone valide"
                      }
                      onValueChange={setTelephoneParrain}
                      className="bg-white shadow-none shadow-transparent"
                    />
                  </div>
                </div>
                <div className="py-4">
                  <h6 className="font-bold text-xl">2. Information de bien</h6>
                </div>
                <div className="step2_detail">
                  <div className="mb-4">
                    <p className="py-4">Type de bien</p>
                    <div className="grid md:grid-cols-6 gap-3 py-6">
                      {typeDeBienList.map((type) => (
                        <label
                          key={type.value}
                          className={`${
                            typeDeBien === type.value
                              ? "bg-gray-50 border-2 border-green-600"
                              : "bg-white hover:bg-gray-200 border-2 border-gray-200"
                          } flex rounded-lg py-4 flex-col items-center gap-2 relative cursor-pointer `}
                        >
                          {typeDeBien === type.value ? (
                            <FaRegCheckSquare
                              size={18}
                              className="absolute ms-9 text-green-600"
                            />
                          ) : (
                            <FaRegSquare
                              size={18}
                              className="absolute ms-9 text-gray-400"
                            />
                          )}
                          <Image
                            src={type.icon}
                            width={0}
                            height={0}
                            sizes="60px"
                            style={{ width: "60px", height: "auto" }}
                            className={`${
                              typeDeBien === type.value ? "" : "opacity-60"
                            } mt-6`}
                            alt=""
                          />
                          <input
                            type="radio"
                            name="typeDeBien"
                            value={type.value}
                            id="vente"
                            className="opacity-0 absolute"
                            defaultChecked={typeDeBien === type.value}
                            onChange={(e) => setTypeDeBien(e.target.value)}
                          />
                          <span className="leading-tight text-sm mt-3 text-center">
                            {type.value}
                          </span>
                        </label>
                      ))}
                    </div>
                    <div className="-mt-3">
                      <button
                        type="button"
                        onClick={() => setTypeDeBien("Autre")}
                        className="bg-white hover:bg-gray-200 border-2 border-gray-200 px-5 cursor-pointer py-2 rounded-md"
                      >
                        Autre (Plusieurs appartements, Plusieurs maisons, ...)
                      </button>
                    </div>
                  </div>
                  {typeDeBienAutreShow ? (
                    <div className="mb-2">
                      <input
                        type="text"
                        value={typeDeBienAutre}
                        onChange={(e) => setTypeDeBienAutre(e.target.value)}
                        className="form-input w-full py-2 px-3 h-12 bg-white dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-green-600 dark:border-gray-800 dark:focus:border-green-600 focus:ring-0"
                        placeholder="Saisir votre type de bien ici ..."
                        name="typeDeBienAutre"
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="mb-2">
                    <select
                      value={anneDeContruction}
                      onChange={(e) => setAnneDeContruction(e.target.value)}
                      className="form-select form-input w-full py-2 px-3 h-12 bg-white dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-green-600 dark:border-gray-800 dark:focus:border-green-600 focus:ring-0"
                    >
                      <option value="" defaultValue disabled>
                        Date de construction du bien
                      </option>
                      <option value="<2ans">Moins de 2 ans</option>
                      <option value="2ans<>15ans">Entre 2 et 15 ans</option>
                      <option value=">15ans">Plus de 15 ans</option>
                      <option value="plutard">
                        A spécifier ultérieurement avec l’expert
                      </option>
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="">
                      <select
                        value={superficie}
                        onChange={(e) => setSuperficie(e.target.value)}
                        className="form-select form-input mt-2 w-full py-2 px-3 h-12 bg-white dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-green-600 dark:border-gray-800 dark:focus:border-green-600 focus:ring-0"
                      >
                        <option value="" defaultValue disabled>
                          Superficie
                        </option>
                        <option value="50">Moins de 50 m²</option>
                        <option value="100">50 à 100 m²</option>
                        <option value="150">100 à 150 m²</option>
                        <option value="200">150 à 200 m²</option>
                        <option value="200+">Plus de 200 m²</option>
                        <option value="plutard">
                          A spécifier ultérieurement avec l’expert
                        </option>
                      </select>
                    </div>
                    <div className="">
                      <select
                        value={nbrePerson}
                        onChange={(e) => setNbrePerson(e.target.value)}
                        className="form-select form-input mt-2 w-full py-2 px-3 h-12 bg-white dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-green-600 dark:border-gray-800 dark:focus:border-green-600 focus:ring-0"
                      >
                        <option value="" defaultValue disabled>
                          Nombre de personne
                        </option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>5+</option>
                        <option value="plutard">
                          A spécifier ultérieurement avec l’expert
                        </option>
                      </select>
                    </div>
                  </div>
                  {nbrePerson5Plus ? (
                    <div className="mt-2 mb-2">
                      <input
                        type="number"
                        value={nbrePersonAutre}
                        min={6}
                        onChange={(e) => setNbrePersonAutre(e.target.value)}
                        className="form-input w-full py-2 px-3 h-12 bg-white dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-green-600 dark:border-gray-800 dark:focus:border-green-600 focus:ring-0"
                        placeholder="Nombre de personne"
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="">
                      <select
                        value={revenue}
                        onChange={(e) => setRevenue(e.target.value)}
                        className="form-select form-input mt-2 w-full py-2 px-3 h-12 bg-white dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-green-600 dark:border-gray-800 dark:focus:border-green-600 focus:ring-0"
                      >
                        <option value="" defaultValue disabled>
                          Revenue
                        </option>
                        {revenueList.map((r, index) => (
                          <option value={r.value} key={`revenu_${index}`}>
                            {r.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="">
                      <select
                        value={typeDeChauffage}
                        onChange={(e) => setTypeDeChauffage(e.target.value)}
                        className="form-select form-input mt-2 w-full py-2 px-3 h-12 bg-white dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-green-600 dark:border-gray-800 dark:focus:border-green-600 focus:ring-0"
                      >
                        <option value="" defaultValue disabled>
                          Chauffage actuel
                        </option>
                        <option value="Electricité">Electricité</option>
                        <option value="Fioul">Fioul</option>
                        <option value="Gaz de ville">Gaz de ville</option>
                        <option value="Bois">Bois</option>
                        <option value="Charbon">Charbon</option>
                        <option value="Autre">Autre</option>
                      </select>
                    </div>
                  </div>

                  {typeDeChauffageAutreShow ? (
                    <div className="mt-4 mb-2">
                      <input
                        type="text"
                        value={typeDeChauffageAutre}
                        onChange={(e) =>
                          setTypeDeChauffageAutre(e.target.value)
                        }
                        className="form-input w-full py-2 px-3 h-12 bg-white dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-green-600 dark:border-gray-800 dark:focus:border-green-600 focus:ring-0"
                        placeholder="Saisir votre type de chauffage ici ..."
                      />
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="">
                      <select
                        value={delai}
                        onChange={(e) => setDelai(e.target.value)}
                        className="form-select form-input w-full mt-2 py-2 px-3 h-12 bg-white dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-green-600 dark:border-gray-800 dark:focus:border-green-600 focus:ring-0"
                      >
                        <option value="" defaultValue disabled>
                          Délai souhaité
                        </option>
                        <option value="Au plus vite">Au plus vite</option>
                        <option value="Dans moins d’un mois">
                          Dans moins d’un mois
                        </option>
                        <option value="Dans moins de deux mois">
                          Dans moins de deux mois
                        </option>
                        <option value="Dans moins de six mois">
                          Dans moins de six mois
                        </option>
                        <option value="Dans l’année">Dans l’année</option>
                        <option value="plutard">
                          A spécifier ultérieurement avec l’expert
                        </option>
                      </select>
                    </div>
                    <div className="">
                      <select
                        value={dpe}
                        onChange={(e) => setDpe(e.target.value)}
                        className="form-select form-input mt-2 w-full py-2 px-3 h-12 bg-white dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-green-600 dark:border-gray-800 dark:focus:border-green-600 focus:ring-0"
                      >
                        <option value="" defaultValue disabled>
                          DPE
                        </option>
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                        <option>D</option>
                        <option>E</option>
                        <option>F</option>
                        <option>G</option>
                        <option value="plutard">
                          A spécifier ultérieurement avec l’expert
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-3">
                    <textarea
                      id="desc"
                      name="description"
                      defaultValue={descriptifTravaux}
                      onChange={(e) => setDescriptifTravaux(e.target.value)}
                      placeholder="Descriptif de votre besoin"
                      className="form-input w-full py-2 px-3 h-28 bg-white dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-green-600 dark:border-gray-800 dark:focus:border-green-600 focus:ring-0"
                    ></textarea>
                  </div>
                </div>
                <div className="mt-5 text-xs">
                  <span className="text-red-600">*</span> Information
                  obligatoire.
                </div>
                <div className="mt-5 hidden">
                  <button
                    type="button"
                    onClick={handleCalculeDevis}
                    className="bg-green-600 px-5 cursor-pointer py-2 text-white rounded-md"
                  >
                    Calcule ma prime
                  </button>
                </div>
                <div className="mt-5">
                  <button
                    type="submit"
                    disabled={
                      loadingDetail ||
                      nom === "" ||
                      prenom === "" ||
                      telephone === "" ||
                      isInvalidPhone
                    }
                    className={`${
                      loadingDetail ||
                      nom === "" ||
                      prenom === "" ||
                      telephone === "" ||
                      isInvalidPhone
                        ? "disabled:opacity-50 disabled:pointer-events-none"
                        : ""
                    } py-2 cursor-pointer flex items-center justify-center px-5 font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 text-white rounded-md w-full`}
                  >
                    {loadingDetail
                      ? "Veuillez patienter svp..."
                      : "Recevoir mon devis"}
                    <Oval
                      visible={loadingDetail}
                      height="25"
                      width="25"
                      color="#FFFFFF"
                      ariaLabel="oval-loading"
                      wrapperStyle={{}}
                      wrapperClass="px-2"
                    />
                  </button>
                </div>
              </div>
            </>
          )}
        </form>
      </div>
      {}
    </>
  );
};

export default SimulationForm;
