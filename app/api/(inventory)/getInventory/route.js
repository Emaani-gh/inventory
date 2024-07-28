import { connectToDatabase } from "@/utils/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const inventoryCollection = db.collection("inventory");

    const inventory = await inventoryCollection.find({}).toArray();

    return new NextResponse(JSON.stringify(inventory), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
