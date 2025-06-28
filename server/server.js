import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

import { logger, logEvents } from './middlewares/logger.js';
import { errorHandler } from './middlewares/errorHandler.js';
import corsOptions from './config/corsOptions.js';
import connectDB from './config/db.js';

// Routers
import adminRouter from './routes/authRoute.js';
import agentRouter from './routes/agentRoute.js';
import contactRouter from './routes/contactRoute.js';
import dashboardRouter from './routes/adminRoute.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

// 📍 Get __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Connect DB
connectDB();

// ✅ Middleware
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ API Routes
app.use('/api/auth', adminRouter);
app.use('/api/agents', agentRouter);
app.use('/api/contacts', contactRouter);
app.use('/api/admin', dashboardRouter);

// ✅ Serve frontend (Vite build in client/dist)
const frontendPath = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(frontendPath));

// ✅ Handle all other non-API routes (React SPA support)
app.get(/^\/(?!api).*/, (req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(404).json({ message: 'API Route Not Found' });
  }
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.all(/^\/(?!api).*/, (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
      res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
      res.json({ message: "404 Not Found" });
  } else {
      res.type("txt").send("404 Not Found");
  }
});
// ✅ Global Error Handler
app.use(errorHandler);

// ✅ DB Connection Events
mongoose.connection.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
  logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log');
});
