import { Schema, model } from 'mongoose';
import type { IUser } from './user.types.js';


// 2. Create the Schema corresponding to the document interface.
const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ['USER', 'WORKER', 'ADMIN', 'SUPERADMIN'],
      default: 'USER',
    },
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isSuperAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    // Mongoose handles 'createdAt' and 'updatedAt' automatically
    timestamps: true,
  }
);

// 3. Create and export the Model.
const User = model<IUser>('User', userSchema);

// Hash password before saving
// userSchema.pre('save', async function (next) {
//   const user = this as unknown as IUser & { password?: string };
//   try {
//     console.log('pre save')
//     // only hash if password is modified or is new
//     // @ts-ignore
//     if (!user.isModified || !user.isModified('password')) return next();
//     if (!user.password) return next();
    
//     next();
//   } catch (err) {
//     next(err as Error);
//   }
// });

export default User;