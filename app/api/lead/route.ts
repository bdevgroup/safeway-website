// pages/api/submitForm.js
import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import CryptoJS from "crypto-ts";

const publicKey = process.env.CLE_PUBLIQUE;
const privateKey = process.env.CLE_PRIVE;
const handleEncrypt = (inputText) => {
  const encrypted = CryptoJS.AES.encrypt(inputText, publicKey).toString();
  return encrypted;
};
export async function POST(req) {
  const body = await req.json();
  const timestamp = new Date();
  const {
    nom,
    prenom,
    telephone,
    email,
    isParrainageSelected,
    telephoneParrain,
    typeDeBien,
    typeDeChauffage,
    typeDeBienAutre,
    anneDeContruction,
    delai,
    superficie,
    revenue,
    nbrePerson,
    descriptifTravaux,
    dpe,
    calendarDate,
    typeTime,
    leadType,
    leadID,
  } = body;

  let nomEncrypted = handleEncrypt(nom);
  let prenomEncrypted = handleEncrypt(prenom);
  let telephoneEncrypted = handleEncrypt(telephone);

  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection("leads");
    if (leadID) {
      const objectId = new ObjectId(leadID);
      const result = await collection.findOneAndUpdate(
        { _id: objectId },
        {
          $set: {
            calendarDate: calendarDate,
            typeTime: typeTime,
          },
        }
      );
      return new Response("Form updated successfully", {
        status: 201,
      });
    } else {
      if (telephone === "" || nom === "" || prenom === "") {
        console.error(
          "Error submitting form, nom, prenom, telephone are required"
        );
        return new Response(
          "Error submitting form, nom, prenom, telephone are required",
          {
            status: 500,
          }
        );
      } else {
        const result = await collection.insertOne({
          leadType,
          email,
          nom: nomEncrypted,
          prenom: prenomEncrypted,
          telephone: telephoneEncrypted,
          isParrainageSelected,
          telephoneParrain,
          typeDeBien,
          typeDeBienAutre,
          typeDeChauffage,
          anneDeContruction,
          delai,
          superficie,
          revenue,
          nbrePerson,
          descriptifTravaux,
          dpe,
          calendarDate,
          typeTime,
          timestamp,
        });
        const responseData = {
          success: true,
          insertedId: result.insertedId.toString(),
        };
        const response = NextResponse.json(responseData);

        return response;
      }
    }
  } catch (error) {
    console.error("Error storing form data in MongoDB:", error);
    return new Response("Error submitting form", {
      status: 500,
    });
  } finally {
    await client.close();
  }
}