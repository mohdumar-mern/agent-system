import Agent from "../models/agentModel.js";
import bcrypt from "bcrypt";
import expressAsyncHandler from "express-async-handler";

// @desc    Register new Agent
// @route   POST /agents
// @access  public

export const registerAgent = expressAsyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // dublicate email
  const duplicate = await Agent.findOne({ email }).lean().exec();
  if (duplicate) {
    return res.status(409).json({ message: "Email already Exists" });
  }
  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const agent = await Agent.create({
    name,
    email,
    phone,
    password: hashedPassword,
  });
  if (agent) {
    res.status(201).json({ message: `New agent ${name} created` });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
});

// @desc    Retrive all Agent
// @route   GET /agents
// @access  public

export const getAllAgents = expressAsyncHandler(async (req, res) => {
  const agents = await Agent.find().select("-password").lean();
  if (!agents?.length) {
    return res.status(400).json({ message: "No agents found" });
  }
  res.json(agents);
});

// @desc    Delete Agent
// @route   DELETE /agents
// @access  protect
export const deleteAgent = expressAsyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Agent ID required" });
  }
  const agent = await Agent.findById(id).exec();
  if (!agent) {
    return res.status(400).json({ message: "Agent not found" });
  }
  const result = await Agent.findByIdAndDelete(id);
  const reply = `Agent ${result.name} with ID ${result._id} deleted`;
  res.json(reply);
});
