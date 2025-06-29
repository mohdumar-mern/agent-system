import csv from "csv-parser";
import fs from "fs";
import path from "path";
import xlsx from "xlsx";
import Contact from "../models/contactModel.js";
import Agent from "../models/agentModel.js";

export const uploadCSV = async (req, res) => {
  const agents = await Agent.find().lean().exec();
  if (agents.length !== 5)
    return res.status(400).json({ message: "Exactly 5 agents required" });

  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const ext = path.extname(req.file.originalname).toLowerCase();
  let results = [];

  try {
    if (ext === ".csv") {
      // ✅ Handle CSV files
      results = await new Promise((resolve, reject) => {
        const temp = [];
        fs.createReadStream(req.file.path)
          .pipe(csv())
          .on("data", (data) => temp.push(data))
          .on("end", () => resolve(temp))
          .on("error", (err) => reject(err));
      });
    } else if (ext === ".xlsx" || ext === ".xls") {
      // ✅ Handle Excel files
      const workbook = xlsx.readFile(req.file.path);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      results = xlsx.utils.sheet_to_json(sheet);
    } else {
      return res.status(400).json({ message: "Unsupported file type" });
    }

    // ✅ Distribute logic
    const perAgent = Math.floor(results.length / 5);
    const remainder = results.length % 5;

    let distributed = {};
    let index = 0;
    for (let i = 0; i < agents.length; i++) {
      const extra = i < remainder ? 1 : 0;
      const count = perAgent + extra;
      const assigned = results.slice(index, index + count);
      distributed[agents[i].name] = assigned;

      await Promise.all(
        assigned.map((item) =>
          Contact.create({
            firstName:
              item.FirstName || item.firstname || item.first_name || "",
            phone: item.Phone || item.phone || item.mobile || "",
            notes: item.Notes || item.notes || "",
            assignedTo: agents[i]._id,
          }),
        ),
      );

      index += count;
    }

    fs.unlinkSync(req.file.path); // 🧹 Clean temp file
    res.json(distributed);
  } catch (err) {
    console.error("Upload error:", err);
    fs.unlinkSync(req.file.path); // clean file
    res.status(500).json({ message: "File processing failed" });
  }
};

export const getContactsByAgent = async (req, res) => {
  const { agentId } = req.params;

  try {
    const contacts = await Contact.find({ assignedTo: agentId });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching contacts" });
  }
};
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().lean().exec();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching contacts" });
  }
};
