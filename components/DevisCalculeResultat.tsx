"use client";
import Image from "next/image";
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { CiCircleChevRight } from "react-icons/ci";
import React from "react";
import PopUpEtreAppeler2 from "./popUpEtreAppeler2";
import { formatMoney, getCurrentDate } from '../lib/utils';

export class DevisCalculeResultat extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      eligible,
      typeRessources,
      chauffageList,
      AUTRESTRAVAUXList,
      telephone,
      insertedLeadID,
    } = JSON.parse(this.props.data);
    // console.log(eligible, typeRessources);

    return (
      <>
        <section className="p-3" id="element-to-download-as-pdf">
          <style type="text/css" media="print">
            {
              "\
   @page { size: portrait; margin: 40px 20px 40px 20px; }\
"
            }
          </style>
          <div className="max-w-5xl mx-auto">
            <article className="overflow-hidden">
              <div className="p-9">
                <div className="space-y-6 text-slate-700">
                  <div className="flex justify-center items-center mb-12">
                    <Image
                      src={`/images/renovation/safeway_logo.png`}
                      width={150}
                      height={50}
                      className="printable"
                      alt=""
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-lg flex-col font-extrabold tracking-tight uppercase font-body">
                      <span className="">Détail du devis :</span>
                    </p>
                    <p className="text-lg font-normal text-slate-700">
                      le {getCurrentDate("/")}
                    </p>
                  </div>
                  <div className="flex flex-col gap-5">
                    <div className="flex text-lg justify-between gap-3 items-start">
                      <p>
                        <strong>1.</strong> Ce devis est initial et présente
                        tous les travaux envisageables. Il sera affiné en
                        fonction des travaux que vous allez choisir lors de la
                        discussion avec notre expert, qui adaptera les
                        propositions selon vos besoins et les matériaux
                        sélectionnés.
                      </p>
                      <PopUpEtreAppeler2
                        telephone={telephone}
                        leadID={insertedLeadID}
                      />
                    </div>
                    <div className="flex text-lg justify-between items-start">
                      <p>
                        <strong>2.</strong> Si vos travaux ne sont pas liés à la
                        rénovation énergétique, un devis vous sera proposé lors
                        d’un échange avec l’un de nos experts, qui vous
                        contactera rapidement ou à un créneau que vous allez
                        choisir.
                      </p>
                      <PopUpEtreAppeler2
                        telephone={telephone}
                        leadID={insertedLeadID}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 w-full">
                <Table
                  color="success"
                  selectionMode="none"
                  aria-label="Devis Safeway"
                  className="w-full"
                >
                  <TableHeader>
                    <TableColumn>
                      <span className="font-bold text-sm">
                        Type de traveaux
                      </span>
                    </TableColumn>
                    <TableColumn>
                      <span className="font-bold text-sm">MaPrimeRenov</span>
                    </TableColumn>
                    <TableColumn>
                      <span className="font-bold text-sm">
                        Dépense prévisionnelle
                      </span>
                    </TableColumn>
                    <TableColumn>
                      <span className="font-bold text-sm">Reste à charge</span>
                    </TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow
                      key="1111"
                      className="bg-blue-200 text-black rounded-sm"
                    >
                      <TableCell>
                        <div className="text-nowrap max-w-10 font-bold text-sm">
                          CHAUFFAGE ET EAU CHAUDE SANITAIRE
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="opacity-0">test</div>
                      </TableCell>
                      <TableCell>
                        <div className="opacity-0">test</div>
                      </TableCell>
                      <TableCell>
                        <div className="opacity-0">test</div>
                      </TableCell>
                    </TableRow>
                    {chauffageList
                      .sort((a, b) => b.primeRenovModeste - a.primeRenovModeste)
                      .map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.type}</TableCell>
                          <TableCell>
                            {typeRessources === "TRÈS MODESTES" && eligible
                              ? formatMoney(item.primeRenovTresModeste)
                              : typeRessources === "MODESTES" && eligible
                              ? formatMoney(item.primeRenovModeste)
                              : typeRessources === "INTERMÉDIAIRES" && eligible
                              ? formatMoney(item.primeRenovInter)
                              : item.primeRenovSupper}
                          </TableCell>
                          <TableCell>
                            {formatMoney(item.depensePrevionnelle)}
                          </TableCell>
                          <TableCell className="font-medium">
                            {typeRessources === "TRÈS MODESTES" && eligible
                              ? formatMoney(
                                  item.depensePrevionnelle -
                                    item.primeRenovTresModeste
                                )
                              : typeRessources === "MODESTES" && eligible
                              ? formatMoney(
                                  item.depensePrevionnelle -
                                    item.primeRenovModeste
                                )
                              : typeRessources === "INTERMÉDIAIRES" && eligible
                              ? formatMoney(
                                  item.depensePrevionnelle -
                                    item.primeRenovInter
                                )
                              : formatMoney(item.depensePrevionnelle)}
                          </TableCell>
                        </TableRow>
                      ))}
                    <TableRow
                      key="111"
                      className="bg-blue-200 text-black rounded-md"
                    >
                      <TableCell>
                        <div className="text-nowrap max-w-10 font-bold text-sm">
                          AUTRES TRAVAUX
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="opacity-0">test</div>
                      </TableCell>
                      <TableCell>
                        <div className="opacity-0">test</div>
                      </TableCell>
                      <TableCell>
                        <div className="opacity-0">test</div>
                      </TableCell>
                    </TableRow>
                    {AUTRESTRAVAUXList.sort(
                      (a, b) => b.primeRenovModeste - a.primeRenovModeste
                    ).map((item, index) => (
                      <TableRow key={chauffageList.length + index}>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>
                          {typeRessources === "TRÈS MODESTES" && eligible
                            ? formatMoney(item.primeRenovTresModeste)
                            : typeRessources === "MODESTES" && eligible
                            ? formatMoney(item.primeRenovModeste)
                            : typeRessources === "INTERMÉDIAIRES" && eligible
                            ? formatMoney(item.primeRenovInter)
                            : item.primeRenovSupper}
                        </TableCell>
                        <TableCell>
                          {formatMoney(item.depensePrevionnelle)}
                        </TableCell>
                        <TableCell className="font-medium">
                          {item.type.includes("Audit") ? (
                            <>
                              <span className="line-through">
                                {typeRessources === "TRÈS MODESTES" && eligible
                                  ? formatMoney(
                                      item.depensePrevionnelle -
                                        item.primeRenovTresModeste
                                    )
                                  : typeRessources === "MODESTES" && eligible
                                  ? formatMoney(
                                      item.depensePrevionnelle -
                                        item.primeRenovModeste
                                    )
                                  : typeRessources === "INTERMÉDIAIRES" &&
                                    eligible
                                  ? formatMoney(
                                      item.depensePrevionnelle -
                                        item.primeRenovInter
                                    )
                                  : formatMoney(item.depensePrevionnelle)}
                              </span>
                              <Chip color="success">Offert gratuitement</Chip>
                            </>
                          ) : typeRessources === "TRÈS MODESTES" && eligible ? (
                            formatMoney(
                              item.depensePrevionnelle -
                                item.primeRenovTresModeste
                            )
                          ) : typeRessources === "MODESTES" && eligible ? (
                            formatMoney(
                              item.depensePrevionnelle - item.primeRenovModeste
                            )
                          ) : typeRessources === "INTERMÉDIAIRES" &&
                            eligible ? (
                            formatMoney(
                              item.depensePrevionnelle - item.primeRenovInter
                            )
                          ) : (
                            formatMoney(item.depensePrevionnelle)
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-12">
                  <ol>
                    <li className="flex items-baseline justify-start gap-3 mt-3">
                      <div>
                        <CiCircleChevRight
                          size={20}
                          className="transform translate-y-1"
                        />{" "}
                      </div>
                      <div>
                        Audit et devis gratuit. Si vous possédez un devis d’un
                        autre prestataire, nous vous proposerons une offre
                        supérieure en termes de coût, qualité des matériaux,
                        délais de réalisation et suivi de dossier. Pour plus
                        d’informations, contactez nous par email. :
                        <strong>contact@safewayrenovation.fr</strong>
                      </div>
                    </li>
                    <li className="flex items-baseline justify-start gap-3 mt-3">
                      <div>
                        <CiCircleChevRight
                          size={20}
                          className="transform translate-y-1"
                        />
                      </div>
                      En plus de la prime Renov, vous aurez accès à la prime CEE
                      en fonction de votre situation. Cette prime sera déduite
                      du reste à charge lors de la finalisation du devis
                    </li>
                    <li className="flex items-baseline justify-start gap-3 mt-3">
                      <div>
                        <CiCircleChevRight
                          size={20}
                          className="transform translate-y-1"
                        />
                      </div>
                      Profitez de notre offre de bienvenue exclusive : présentez
                      le coupon BIENVENUE2024 lors de la finalisation de votre
                      devis pour bénéficier d’une réduction pouvant atteindre
                      jusqu’à 10% sur le montant total.
                    </li>
                    <li className="flex items-baseline justify-start gap-3 mt-3">
                      <div>
                        <CiCircleChevRight
                          size={20}
                          className="transform translate-y-1"
                        />
                      </div>
                      Le reste à charge peut être financé jusqu’à 100% par
                      L’éco-prêt à taux zéro selon votre situation. Ces détails
                      seront abordés lors de la finalisation du devis.
                    </li>
                    <li className="flex items-baseline justify-start gap-3 mt-3">
                      <div>
                        <CiCircleChevRight
                          size={20}
                          className="transform translate-y-1"
                        />
                      </div>
                      Bénéficiez de notre offre exclusive de parrainage. Recevez
                      un chèque cadeau pour chaque personne que vous recommandez
                      et qui réalise des travaux avec nous, sans aucune limite
                      de cumul. Le détail sera abordé lors de la finalisation du
                      devis.
                    </li>
                  </ol>
                </div>
              </div>
            </article>
          </div>
        </section>
      </>
    );
  }
}
export const FunctionalComponentToPrint = React.forwardRef((props, ref) => {
  // eslint-disable-line max-len
  return <DevisCalculeResultat ref={ref} {...props} />;
});
