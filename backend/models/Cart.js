import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema(
  {
    gameId: { type: mongoose.Schema.Types.ObjectId, ref: "Game", required: true },
    editionId: { type: String, required: true },

    titleSnapshot: { type: String, required: true },
    editionSnapshot: { type: String, required: true },
    priceSnapshot: { type: Number, required: true },
    coverSnapshot: { type: String, required: true },

    addedAt: { type: Date, default: Date.now }
  },
  { timestamps: false }
);

const CartSchema = new mongoose.Schema(
  {
    guestId: { type: String, required: true, unique: true },
    items: { type: [CartItemSchema], default: [] }
  },
  { timestamps: true }
);

export default mongoose.model("Cart", CartSchema);
