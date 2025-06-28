import multer from "multer";
import path from "path";
import fs from "fs";

// ✅ Ensure uploads directory exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const cleanName = file.originalname.replace(/\s+/g, "-");
    cb(null, `${timestamp}-${cleanName}`);
  },
});

// ✅ File filter for CSV, XLS, XLSX
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if ([".csv", ".xls", ".xlsx"].includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only .csv, .xls, .xlsx files are allowed!"), false);
  }
};

// ✅ Export configured upload middleware
export const upload = multer({ storage, fileFilter });
