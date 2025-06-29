import express from "express";
import multer from "multer";
import { uploadCSV, getContacts } from "../controllers/contactController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multerMiddleware.js";

const router = express.Router();

router.post("/upload", protect, upload.single("csv"), uploadCSV);
router.get("/", protect, getContacts);

export default router;
