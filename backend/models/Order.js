import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema(
  {
    gameId: { type: mongoose.Schema.Types.ObjectId, ref: "Game", required: true },
    editionId: { type: String, required: true },

    titleSnapshot: { type: String, required: true },
    editionSnapshot: { type: String, required: true },
    priceSnapshot: { type: Number, required: true },
    coverSnapshot: { type: String, required: true }
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    guestId: { type: String, required: true },
    items: { type: [OrderItemSchema], default: [] },
    totalPrice: { type: Number, required: true },
    status: { type: String, default: "paid" }
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
