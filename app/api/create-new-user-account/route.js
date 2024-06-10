var admin = require("firebase-admin");
var serviceAccount = require("../../../serviceAccountKey.json");

export async function POST(req, res) {
  const reqResult = await req.json();

  // Check if the app has not been initialized
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.NEXT_PUBLIC_FirebaseDatabaseURL,
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
