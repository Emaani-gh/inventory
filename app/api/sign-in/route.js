import { connectToDatabase } from "@/utils/mongodb";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { generateToken } from "@/app/middleware/auth";

const SECRET_KEY = process.env.JWT_SECRET;

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    const { db } = await connectToDatabase();
    const user = await db.collection("users").findOne({ emailAddress: email });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = generateToken(user);

    // const token = jwt.sign(
    //   { email: user.emailAddress, name: user.firstName },
    //   SECRET_KEY,
    //   { expiresIn: "7d" }
    // );

    return NextResponse.json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
