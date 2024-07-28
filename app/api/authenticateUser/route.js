import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const SECRET_KEY = process.env.JWT_SECRET;

export async function POST(req) {
  const { token } = await req.json();

  try {
    jwt.verify(token, SECRET_KEY);
    return NextResponse.json({ valid: true });
  } catch (error) {
    return NextResponse.json({ valid: false }, { status: 401 });
  }
}
