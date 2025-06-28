import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if ([".csv", ".xls", ".xlsx"].includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only .csv, .xls, .xlsx files are allowed!"), false);
  }
};

export const upload = multer({ storage, fileFilter });
