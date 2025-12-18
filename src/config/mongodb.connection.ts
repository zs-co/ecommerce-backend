import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Replace the placeholder with your MongoDB connection string
const uri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/ecommerce-db';

const createConnection = async () => {
    try {
        await mongoose.connect(uri, {
            // options can be added here if needed
        });
        console.log('Connected to MongoDB via Mongoose');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
};

export default createConnection;