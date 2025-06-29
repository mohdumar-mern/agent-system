import express from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";

const router = express.Router();

import { protect } from "../middlewares/authMiddleware.js";

router.route("/stats").get(protect, getDashboardStats);

export default router;
