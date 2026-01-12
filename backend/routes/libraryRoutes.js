import express from "express";
import requireGuest from "../middleware/requireGuest.js";
import { getLibrary } from "../controllers/libraryController.js";

const router = express.Router();

router.use(requireGuest);
router.get("/", getLibrary);

export default router;
