import { allowOrigin } from "./allowedOrigin.js";

const corsOptions = {
  origin: (origin, callback) => {
    if (allowOrigin.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
