import User from '../user/user.model.js';
import type { IUser } from '../user/user.types.js';
import jwt, { type SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET ?? 'change_this_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? '1h';

export class AuthService {
  public async register(data: Partial<IUser>): Promise<Partial<IUser>> {
    if (!data.email) throw new Error('Email is required');
    const existing = await User.findOne({ email: data.email });
    if (existing) throw new Error('Email already in use');
    const hashPassword = await bcrypt.hash(data.password!, 10);
    data.password = hashPassword; 
    const user = new User(data);
    await user.save();
    // Do not return password
    const u = user.toObject();
    delete (u as any).password;
    return u as Partial<IUser>;
  }

  public async login(email: string, password: string) {
    const user = await User.findOne({ email }).select('+password');
    if (!user) throw new Error('Invalid credentials');
    const match = await bcrypt.compare(password, (user as any).password);
    if (!match) throw new Error('Invalid credentials');
    const token = jwt.sign({ sub: user._id }, JWT_SECRET as jwt.Secret, { expiresIn: JWT_EXPIRES_IN } as SignOptions);
    const u = user.toObject();
    delete (u as any).password;
    return {
      token,
      user: u,
    };
  }
}

export const authService = new AuthService();
