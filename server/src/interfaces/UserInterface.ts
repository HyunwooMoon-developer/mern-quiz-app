import { Document } from 'mongoose';

interface UserInterface extends Document {
  email: string;
  password: string;
  isAdmin: boolean;
  fname: string;
  lname: string;
  comparePassword: (password: string) => boolean;
}

export default UserInterface;
