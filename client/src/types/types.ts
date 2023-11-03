export type RegisterType = {
  email: string;
  password: string;
  fname: string;
  lname: string;
};

export type LoginType = {
  email: string;
  password: string;
};

export type UserType = {
  _id: string;
  email: string;
  fname: string;
  lname: string;
};

export type ExamType = {
  _id?: string;
  name: string;
  category: string;
  duration: number;
  total: number;
  correct: number;
};
