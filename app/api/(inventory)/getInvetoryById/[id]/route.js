import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  const { id } = params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  try {
    const { db } = await connectToDatabase();
    const inventoryItem = await db
      .collection("inventory")
      .findOne({ _id: new ObjectId(id) });

    if (!inventoryItem) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(inventoryItem);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching item", error },
      { status: 500 }
    );
  }
}
