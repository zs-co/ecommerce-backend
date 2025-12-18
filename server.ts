import express from 'express';
import type { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rootRouter from './src/apps/index.js';
import listEndpoints from 'express-list-endpoints';
import errorMiddleware from './src/middlewares/error.middleware.js';
import createConnection from './src/config/mongodb.connection.js';
import passport from './src/config/passport.js';

// 1. Load Environment Variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// 2. Security & Performance Middlewares
// app.use(helmet()); // Protects headers
app.use(cors()); // Enables Cross-Origin requests for your Vue frontend
// app.use(compression()); // Compresses response bodies for faster E-commerce load times
// app.use(morgan('dev')); // Logger for development
app.use(express.json()); // Body parser for JSON
app.use(express.urlencoded({ extended: true }));

// create connection with mongoDB

app.use((req: Request, res: Response, next: NextFunction) => { 
    console.log(`${req.method} ${req.path}/${req.params}?${JSON.stringify(req.query)} {${JSON.stringify(req.body)}}`);
    next(); 
})

// Initialize passport
app.use(passport.initialize());

// 6. Global Error Handler
// app.use(errorMiddleware);

// routes 
app.use('/api/v1', rootRouter);
// app.use('api/v1/user', userRoutes)

// 7. Start Server
(async () => {
    try {
        await createConnection();
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server due to DB connection error', error);
        process.exit(1);
    }
})();