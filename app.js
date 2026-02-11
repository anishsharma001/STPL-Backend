import express from "express";
import cors from 'cors';
import allRoutes from './routes/index.js';
import helmet from 'helmet';

const app = express();

var corsOptions = {
  origin: [
    "http://localhost:3005",
    "http://localhost:4001",
    "http://localhost:5173"
  ],
  optionsSuccessStatus: 200,
};

app.use(helmet());
app.use(cors(corsOptions));

// Increase JSON payload limit
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// API Routes
app.use('/api/v1/', allRoutes);

// Welcome Route
app.get("/", (req, res) => {
  res.send("Welcome to Calibr8 API");
});



export default app;
