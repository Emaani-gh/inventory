import { app } from "@/utils/firebase";

var admin = require("firebase-admin");
var serviceAccount = require("../../../serviceAccountKey.json");

export async function POST(req, res) {
  const reqResult = await req.json();

  // Check if the app has not been initialized
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://upsolutions-777-default-rtdb.firebaseio.com",
      // name: "upsolutions",
    });
  }

  return admin
    .auth()
    .createUser({
      email: reqResult.email,
      password: reqResult.password,
    })
    .then((userRecord) => {
      return new Response(JSON.stringify(userRecord), { status: 200 });
    })
    .catch((error) => {
      return new Response(JSON.stringify(error.message), { status: 500 });
    });
}
