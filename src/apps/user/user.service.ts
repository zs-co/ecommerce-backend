import User from './user.model.js';
import type { IUser } from './user.types.js';
import bcrypt from 'bcrypt';


export class UserService {
    public async list(): Promise<IUser[]> {
        return await User.find().sort({ createdAt: -1 });
    }

    public async get(id: string): Promise<IUser | null> {
        return await User.findById(id);
    }

    public async create(data: Partial<IUser>): Promise<IUser> {
        const user = new User(data);
        const hash =  await bcrypt.hash(user.password!, 10);
        user.password = hash;
        return await user.save();
    }

    public async update(id: string, data: Partial<IUser>): Promise<IUser | null> {
        return await User.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        });
    }

    public async delete(id: string): Promise<IUser | null> {
        return await User.findByIdAndDelete(id);
    }
}

export const userService = new UserService();