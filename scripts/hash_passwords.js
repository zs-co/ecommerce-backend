import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/apps/user/user.model.js';
import bcrypt from 'bcrypt';

dotenv.config();

const uri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/ecommerce-db';

const run = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to DB');

    const users = await User.find().select('+password');
    let updated = 0;

    for (const u of users) {
      const pw = (u as any).password;
      if (!pw) continue;
      // bcrypt hashes usually start with $2
      if (typeof pw === 'string' && pw.startsWith('$2')) continue; // already hashed

      const hash = await bcrypt.hash(pw, 10);
      (u as any).password = hash;
      await u.save();
      updated++;
      console.log(`Updated password for ${u.email}`);
    }

    console.log(`Done. Updated ${updated} user(s).`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
