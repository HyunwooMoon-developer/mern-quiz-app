import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/UserModel.js';
dotenv.config();

const seedData = async () => {
  try {
    const db = await mongoose.connect(process.env.DB_URI as string, {
      serverSelectionTimeoutMS: 10000,
    });

    await User.deleteMany();

    const admin = await User.create({
      email: 'admin@test.com',
      password: 'password123',
      isAdmin: true,
      fname: 'Admin',
      lname: 'Test',
    });

    const user = await User.create({
      email: 'user@test.com',
      password: 'password123',
      isAdmin: false,
      fname: 'User',
      lname: 'Test',
    });

    console.log('User seeded');

    db.disconnect();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

seedData();
