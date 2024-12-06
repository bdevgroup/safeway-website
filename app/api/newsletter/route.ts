// pages/api/submitForm.js
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const timestamp = new Date();
  const { email } = body;

  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection("newsletter");
    // let existEmail = collection.find({email});
    // let existEmail =
    // let existEmail = 0;
    let existEmail = await collection
      .countDocuments({ email: email }, { limit: 1 })
      .then((result) => {
        console.log("result", result);
        return result;
      });
    console.log("existEmail", existEmail);
    if (existEmail > 0) {
      const responseData = {
        success: true,
      };
      const response = NextResponse.json(responseData);
      return response;
    } else {
      await collection.insertOne({
        email,
        timestamp,
      });
      const responseData = {
        success: true,
      };
      const response = NextResponse.json(responseData);

      return response;
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