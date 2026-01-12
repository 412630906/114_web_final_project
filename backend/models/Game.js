import mongoose from "mongoose";

const EditionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },   // standard/deluxe/ultimate...
    name: { type: String, required: true },
    price: { type: Number, required: true },
    note: { type: String, default: "" }
  },
  { _id: false }
);

const GameSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    shortDescription: { type: String, default: "" },
    description: { type: String, default: "" },

    heroImage: { type: String, default: "" },
    capsuleImage: { type: String, default: "" },
    coverImage: { type: String, default: "" },

    screenshots: { type: [String], default: [] },

    releaseDate: { type: String, default: "" },
    developer: { type: String, default: "" },
    publisher: { type: String, default: "" },

    tags: { type: [String], default: [] },

    editions: { type: [EditionSchema], default: [] },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Game", GameSchema);
