import { connectToDatabase } from "@/utils/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { categoryName, description } = await req.json();

    const { db } = await connectToDatabase();
    const categoriesCollection = db.collection("categories");

    const newCategory = {
      categoryName,
      description,
    };

    await categoriesCollection.insertOne(newCategory);

    return new NextResponse(
      JSON.stringify({ message: "Category created successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
