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
  questions: QuestionType[];
};

export type QuestionType = {
  _id?: string;
  name: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctOption: 'A' | 'B' | 'C' | 'D' | null;
};
