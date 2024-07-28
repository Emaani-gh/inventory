import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(req, { params }) {
  const { id } = params;
  const data = await req.json();

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  try {
    const { db } = await connectToDatabase();

    const updatedItem = {
      itemName: data.itemName,
      category: data.category,
      stock: data.stock,
      unitPrice: data.unitPrice,
      addedBy: data.addedBy,
    };

    const result = await db
      .collection("inventory")
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedItem });

    if (result.modifiedCount === 0) {
      return NextResponse.json({ message: "No changes made" }, { status: 304 });
    }

    return NextResponse.json({ message: "Item updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating item", error },
      { status: 500 }
    );
  }
}
