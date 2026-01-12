import express from "express";
import requireGuest from "../middleware/requireGuest.js";
import { getCart, addCartItem, removeCartItem, clearCart } from "../controllers/cartController.js";

const router = express.Router();

router.use(requireGuest);

router.get("/", getCart);
router.post("/items", addCartItem);
router.delete("/items/:itemId", removeCartItem);
router.delete("/", clearCart);

export default router;
