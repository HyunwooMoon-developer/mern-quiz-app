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
  isAdmin: boolean;
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
  options: { [key: string]: string };
  correctOption: 'A' | 'B' | 'C' | 'D' | null;
  exam?: string;
};

export type ReportType = {
  _id: string;
  createdAt: string;
  exam: ExamType;
  user: UserType;
  result: {
    answers: string[];
    correct: number;
    pass: boolean;
  };
};
