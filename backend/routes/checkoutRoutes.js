import express from "express";
import requireGuest from "../middleware/requireGuest.js";
import { checkout } from "../controllers/checkoutController.js";

const router = express.Router();

router.use(requireGuest);
router.post("/", checkout);

export default router;
