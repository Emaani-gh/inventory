import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(req, { params }) {
  const { id } = params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  try {
    const { db } = await connectToDatabase();
    const result = await db.collection("inventory").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Item deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting item", error },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  const { itemName, category, stock, unitPrice, addedBy } = await req.json();

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  try {
    const { db } = await connectToDatabase();
    const result = await db.collection("inventory").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          itemName,
          category,
          stock,
          unitPrice,
          addedBy,
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Item updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating item", error },
      { status: 500 }
    );
  }
}
