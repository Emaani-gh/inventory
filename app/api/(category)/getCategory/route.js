import { connectToDatabase } from "@/utils/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const categoriesCollection = db.collection("categories");

    const categories = await categoriesCollection.find({}).toArray();

    return new NextResponse(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
