import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import gamesRoutes from "./routes/gamesRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import checkoutRoutes from "./routes/checkoutRoutes.js";
import libraryRoutes from "./routes/libraryRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: false }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "OK", data: { status: "up" } });
});

app.use("/api/games", gamesRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/library", libraryRoutes);

app.use(errorHandler);

export default app;
