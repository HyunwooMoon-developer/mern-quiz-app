import express, { Router, Request, Response } from 'express';
import Question from '../models/QuestionModel.js';
import checkAuth from '../utils/checkAuth.js';
import sendError from '../utils/sendError.js';
import Exam from '../models/ExamModel.js';

const router: Router = express.Router();

router
  .route('/')
  .all(checkAuth)
  .post(async (req: Request, res: Response) => {
    const newQuestion = new Question(req.body);

    const question = await newQuestion.save();

    const exam = await Exam.findById(req.body.exam);
    if (exam) {
      exam?.questions.push(question._id);

      await exam.save();
    }

    res.send({
      message: 'Question added successfully',
      success: true,
    });

    try {
    } catch (err: any) {
      sendError(res, err);
    }
  });

router
  .route('/:question_id')
  .all(checkAuth)
  .put(async (req: Request, res: Response) => {
    try {
      const id = req.params.question_id;

      await Question.findByIdAndUpdate(id, req.body);

      res.send({
        message: 'Question updated successfully',
        success: true,
      });
    } catch (err: any) {
      sendError(res, err);
    }
  })
  .delete(async (req: Request, res: Response) => {
    try {
      const id = req.params.question_id;

      await Question.findByIdAndDelete(id);

      const exam = await Exam.findById(req.body.examID);

      if (exam) {
        exam.questions = exam?.questions.filter(
          (question: any) => question._id != id
        );

        await exam.save();

        res.send({
          message: 'Question deleted successfully',
          success: true,
        });
      }
    } catch (err: any) {
      sendError(res, err);
    }
  });

export default router;
