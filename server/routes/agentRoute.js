import express from "express";
const router = express.Router();
import {
  registerAgent,
  getAllAgents,
  deleteAgent,
} from "../controllers/agentController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { getContactsByAgent } from "../controllers/contactController.js";

router
  .route("/", protect)
  .post(registerAgent)
  .get(getAllAgents)
  .delete(deleteAgent);

router.get("/:agentId/contacts", protect, getContactsByAgent);

export default router;
