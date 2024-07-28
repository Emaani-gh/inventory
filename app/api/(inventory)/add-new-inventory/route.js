import { connectToDatabase } from "@/utils/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { verifyToken } from "@/app/middleware/auth";

export async function POST(req) {
  try {
    const { itemName, stock, unitPrice, expenseCategoryId } = await req.json();

    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return new NextResponse(
        JSON.stringify({ message: "Unauthorized: No token" }),
        {
          status: 401,
        }
      );
    }

    const currentUser = verifyToken(token);

    if (!currentUser) {
      return new NextResponse(
        JSON.stringify({ message: "Unauthorized: Invalid token" }),
        {
          status: 401,
        }
      );
    }

    const { db } = await connectToDatabase();
    const inventoryCollection = await db.collection("inventory");
    const category = await db
      .collection("categories")
      .findOne({ _id: new ObjectId(expenseCategoryId) });

    const newInventoryItem = {
      itemName,
      stock,
      unitPrice,
      category: category.categoryName,
      addedBy: currentUser.firstName,
    };

    await inventoryCollection.insertOne(newInventoryItem);

    return new NextResponse(
      JSON.stringify({ message: "Inventory item added successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding inventory item:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
