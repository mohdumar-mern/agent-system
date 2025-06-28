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

// Resolve __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Connect MongoDB
connectDB();

// ✅ Middlewares
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ API Routes
app.use('/api/auth', adminRouter);
app.use('/api/agents', agentRouter);
app.use('/api/contacts', contactRouter);
app.use('/api/admin', dashboardRouter);

// ✅ Serve static frontend (Vite or CRA build in 'frontend/dist')
const frontendPath = path.join(__dirname, '..', 'client', 'dist');
console.log(frontendPath)
app.use(express.static(frontendPath));

// ✅ Serve frontend for all non-API GET requests
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// ✅ 404 handler for unknown API routes
// app.all(`/api/${/^\/(?!api).*/}`, (req, res) => {
//   res.status(404).json({ message: 'API Route Not Found' });
// });

// ✅ Error handler (after all routes)
app.use(errorHandler);

// ✅ MongoDB connection events
mongoose.connection.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log');
});
