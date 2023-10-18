import mongoose, { Mongoose } from "mongoose";

const { Schema } = mongoose;

const VariationSchema = new Schema({
  categoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductCategory",
  },
  name: String,
});

export default mongoose.model("Variation", VariationSchema);
