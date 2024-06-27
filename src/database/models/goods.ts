import mongoose from "mongoose";
import { Category } from './category';

const goodsSchema = new mongoose.Schema({
  category_id: { ref: Category, type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
});
export const Good = mongoose.model("Good", goodsSchema);
