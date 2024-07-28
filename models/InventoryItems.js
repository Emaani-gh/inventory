import mongoose from "mongoose";

const InventoryItemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    expenseCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    addedBy: {
      type: String, // or mongoose.Schema.Types.ObjectId if storing user IDs from another model
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.InventoryItem ||
  mongoose.model("InventoryItem", InventoryItemSchema);
