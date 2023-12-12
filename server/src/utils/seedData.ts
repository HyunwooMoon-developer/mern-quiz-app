import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/UserModel.js';
import Exam from '../models/ExamModel.js';
import Question from '../models/QuestionModel.js';
dotenv.config();

const basicQuestionsArray = [
  {
    name: 'What does M mean in MERN?',
    correctOption: 'B',
    options: {
      A: 'MariaDB',
      B: 'MongoDB',
      C: 'MySQL',
      D: 'MS SQL',
    },
  },
  {
    name: 'What does E mean in MERN?',
    correctOption: 'C',
    options: {
      A: 'Event',
      B: 'Ethernet',
      C: 'Express',
      D: 'End To End',
    },
  },
  {
    name: 'What does R mean in MERN?',
    correctOption: 'D',
    options: {
      A: 'Response',
      B: 'Request',
      C: 'Rail',
      D: 'React',
    },
  },
  {
    name: 'What does N mean in MERN?',
    correctOption: 'A',
    options: {
      A: 'Node',
      B: 'NPM',
      C: 'Next',
      D: 'Network',
    },
  },
  {
    name: "What is 3 + '2' ?",
    correctOption: 'D',
    options: {
      A: "'5'",
      B: "3'2'",
      C: '32',
      D: "'32'",
    },
  },
];

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

    await Exam.deleteMany();

    const typescriptExam = await Exam.create({
      name: 'TypeScript Basic',
      duration: 60,
      category: 'TypeScript',
      total: 5,
      correct: 3,
      questions: [],
    });

    const basicExam = await Exam.create({
      name: 'Mern Basic',
      duration: 60,
      category: 'Basic',
      total: 5,
      correct: 3,
      questions: [],
    });

    console.log('Exam seeded');

    await Question.deleteMany();

    if (typescriptExam) {
      const typescriptQuestion = await Question.create({
        exam: typescriptExam._id,
        name: 'The TypeScript compiler can be configured with which file?',
        correctOption: 'A',
        options: {
          A: 'tsconfig.json',
          B: 'ts.json',
          C: 'typescript.json',
          D: 'tsfile.json',
        },
      });

      if (typescriptQuestion) {
        typescriptExam.questions.push(typescriptQuestion._id);

        await typescriptExam.save();
      }
    }

    if (basicExam) {
      for (let i = 0; i < basicQuestionsArray.length; i++) {
        const basicQuestion = await Question.create({
          exam: basicExam._id,
          ...basicQuestionsArray[i],
        });

        if (basicQuestion) {
          basicExam.questions.push(basicQuestion._id);

          await basicExam.save();
        }
      }
    }

    console.log('Question seeded');

    db.disconnect();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

seedData();
