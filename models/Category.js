import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Category ||
  mongoose.model("Category", CategorySchema);
