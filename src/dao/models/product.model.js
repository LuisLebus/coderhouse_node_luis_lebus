import mongoose from "mongoose";

const productCollection = "products";

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  status: Boolean,
  category: String,
  code: String,
  stock: Number,
  thumbnails: {
    type: Array,
    default: [],
  },
});

export const productModel = mongoose.model(productCollection, productSchema);
