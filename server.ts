import express from 'express';
import type { Application, Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';

// 1. Load Environment Variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// 2. Security & Performance Middlewares
app.use(helmet()); // Protects headers
app.use(cors()); // Enables Cross-Origin requests for your Vue frontend
app.use(compression()); // Compresses response bodies for faster E-commerce load times
app.use(morgan('dev')); // Logger for development
app.use(express.json()); // Body parser for JSON
app.use(express.urlencoded({ extended: true }));

// 6. Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 7. Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});