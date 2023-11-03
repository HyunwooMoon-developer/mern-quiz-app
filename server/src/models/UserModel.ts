import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import UserInterface from '../interfaces/UserInterface.js';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email already in use'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      maxlength: [60, 'Password must less or equal than 60 characters'],
      minlength: [6, 'Password must greater or equal than 6 characters'],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    fname: {
      type: String,
      required: [true, 'First name is required'],
    },
    lname: {
      type: String,
      required: [true, 'Last name is required'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'User',
  }
);

UserSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }

  next();
});

UserSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const User = model<UserInterface>('User', UserSchema);

export default User;
