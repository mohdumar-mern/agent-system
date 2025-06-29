import Admin from "../models/adminModel.js";
import Agent from "../models/agentModel.js";
import Contact from "../models/contactModel.js";

import expressAsyncHandler from "express-async-handler";

export const getDashboardStats = expressAsyncHandler(async (req, res) => {
  try {
    // Fetch the count of agents
    const agentCount = await Agent.countDocuments();

    // Fetch the count of contacts
    const contactCount = await Contact.countDocuments();
    // Fetch the admin details
    const admin = await Admin.findById(req.user._id).select("-password");

    res.status(200).json({
      agentCount,
      contactCount,
      admin,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
