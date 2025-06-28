import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const app = express();

// Middleware imports
import { logger } from './middlewares/logger.js';
import { logEvents } from './middlewares/logger.js';
import { errorHandler } from './middlewares/errorHandler.js';

// Router imports
import corsOptions from './config/corsOptions.js';
import connectDB from './config/db.js';
import rootRouter from './routes/root.js';
import adminRouter from './routes/authRoute.js'
import agentRouter from './routes/agentRoute.js'
import contactRouter from './routes/contactRoute.js'
import dashboardRouter from './routes/adminRoute.js'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const PORT = process.env.PORT || 5000;
connectDB();
app.use(logger);

// Built-in middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));    
app.use(express.static('public'));

app.use('/', rootRouter);
app.use('/api/auth', adminRouter);
app.use('/api/agents', agentRouter);
app.use('/api/contacts', contactRouter);
app.use('/api/admin', dashboardRouter);


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

app.use(errorHandler);


mongoose.connection.once("open", () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
});

mongoose.connection.on("error", (err) => {
    console.log(err);
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log');
});

