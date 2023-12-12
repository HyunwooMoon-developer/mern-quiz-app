import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './utils/connectDB.js';
import userRoute from './routes/userRoute.js';
import examRoute from './routes/examRoute.js';
import questionRoute from './routes/questionRoute.js';
import reportRoute from './routes/reportRoute.js';

dotenv.config();

const port = process.env.PORT || 8000;

const app: Application = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/user', userRoute);
app.use('/api/exam', examRoute);
app.use('/api/question', questionRoute);
app.use('/api/report', reportRoute);

app.listen(port, () => {
  console.log(`Server is ready at http://localhost:${port}`);
});
