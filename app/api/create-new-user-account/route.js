// app/api/signup/route.js
import { connectToDatabase } from "@/utils/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { generateToken } from "@/app/middleware/auth";

const SECRET_KEY = process.env.JWT_SECRET_KEY; // Make sure you set this in your environment variables

export async function POST(req) {
  const { firstName, lastName, emailAddress, password, confirmPassword } =
    await req.json();

  if (password !== confirmPassword) {
    return new Response(JSON.stringify({ message: "Passwords do not match" }), {
      status: 400,
    });
  }

  const { db } = await connectToDatabase();
  const usersCollection = db.collection("users");

  // Check if the user already exists
  const existingUser = await usersCollection.findOne({ emailAddress });
  if (existingUser) {
    return new Response(JSON.stringify({ message: "Email already in use" }), {
      status: 400,
    });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user
  const newUser = {
    firstName,
    lastName,
    emailAddress,
    password: hashedPassword,
  };

  await usersCollection.insertOne(newUser);

  const token = generateToken(newUser);

  return NextResponse.json({ message: "User created", token }, { status: 201 });
}
