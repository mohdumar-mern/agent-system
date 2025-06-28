import csv from "csv-parser";
import fs from "fs";
import xlsx from "xlsx";
import path from "path";
import Contact from "../models/contactModel.js";
import Agent from "../models/agentModel.js";
import expressAsyncHandler from "express-async-handler";

export const uploadCSV = expressAsyncHandler(async (req, res) => {
  const agents = await Agent.find().lean().exec();
  if (agents.length !== 5)
    return res.status(400).json({ message: "Exactly 5 agents required" });

  const filePath = req.file.path;
  const ext = path.extname(filePath).toLowerCase();

  let results = [];

  const distributeAndSave = async () => {
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
            firstName: item.FirstName,
            phone: item.Phone,
            notes: item.Notes,
            assignedTo: agents[i]._id,
          })
        )
      );

      index += count;
    }

    fs.unlink(filePath, () => {}); // cleanup file
    res.json(distributed);
  };

  if (ext === ".csv") {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", distributeAndSave)
      .on("error", (err) => {
        fs.unlink(filePath, () => {});
        res.status(500).json({ message: "CSV parsing failed" });
      });
  } else if (ext === ".xlsx" || ext === ".xls") {
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    results = xlsx.utils.sheet_to_json(sheet);
    await distributeAndSave();
  } else {
    fs.unlink(filePath, () => {});
    return res.status(400).json({ message: "Unsupported file type" });
  }
});


export const getContactsByAgent = expressAsyncHandler(async (req, res) => {
  const { agentId } = req.params;
  console.log(agentId);
  try {
    const contacts = await Contact.find({ assignedTo: agentId });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching contacts" });
  }
});

export const getContacts = expressAsyncHandler(async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching contacts" });
  }
});
