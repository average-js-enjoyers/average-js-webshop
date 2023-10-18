import mongoose, { Mongoose } from "mongoose";

const { Schema } = mongoose;

const VariationOptionSchema = new Schema({
  variationID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Variation",
  },
  value: String,
});

export default mongoose.model("VariationOption", VariationOptionSchema);
