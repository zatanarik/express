import mongoose from "mongoose";
const goodsSchema = new mongoose.Schema({
  category_id: { type: mongoose.Types.ObjectId, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
});
export const Good = mongoose.model("Good", goodsSchema);
