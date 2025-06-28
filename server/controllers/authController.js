import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import Admin from "../models/adminModel.js";
import jwt from "jsonwebtoken";



// @desc    Register new admin
// @route   POST /auth/register
// @access  public
export const register = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)

  // Confirm data
  if (!email || !password ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate email
  const duplicate = await Admin.findOne({ email }).lean().exec();
  if (duplicate) {
    return res.status(409).json({ message: "Email already Exists" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const adminObject = { email, password: hashedPassword, };

  // Create and store new admin
  const admin = await Admin.create(adminObject);

  if (!admin) {
    return res.status(400).json({ message: "Invalid admin data received" });
  }

  res.status(201).json({ message: `New admin ${email} created` });
});



// @desc    Register new admin
// @route   POST /auth/register
// @access  public
export const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)

  // Confirm data
  if (!email || !password ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate email
  const admin = await Admin.findOne({ email });

  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return res.status(401).json({ message: 'Email or Password is incorrect' });
  }
  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
  res.json({ token });
});


 