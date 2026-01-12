import mongoose from "mongoose";

const LibraryItemSchema = new mongoose.Schema(
  {
    gameId: { type: mongoose.Schema.Types.ObjectId, ref: "Game", required: true },
    editionId: { type: String, required: true },

    titleSnapshot: { type: String, required: true },
    editionSnapshot: { type: String, required: true },
    priceSnapshot: { type: Number, required: true },
    coverSnapshot: { type: String, required: true },

    purchasedAt: { type: Date, default: Date.now }
  },
  { timestamps: false }
);

const LibrarySchema = new mongoose.Schema(
  {
    guestId: { type: String, required: true, unique: true },
    games: { type: [LibraryItemSchema], default: [] }
  },
  { timestamps: true }
);

export default mongoose.model("Library", LibrarySchema);
