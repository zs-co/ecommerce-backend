import { Document } from 'mongoose';

// 1. Define an interface representing a document in MongoDB.
export interface IUser extends Document {
    email: string;
    first_name: string;
    last_name: string;
    password?: string;
    phoneNumber?: string;
    role?: string;
    age?: number; // Optional since age might not be required
    isActive: boolean;
    isAdmin: boolean;
    isSuperAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
}
