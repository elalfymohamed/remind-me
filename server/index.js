import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./src/db/connect.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.CONNECTION_URL;

import { endpoints } from "./src/index.router.js";

endpoints(app);

connectDB(CONNECTION_URL, PORT, app);
