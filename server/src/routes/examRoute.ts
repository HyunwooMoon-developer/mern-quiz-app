import express, { Router, Request, Response } from 'express';
import Exam from '../models/ExamModel.js';
import checkAuth from '../utils/checkAuth.js';
import sendError from '../utils/sendError.js';

const router: Router = express.Router();

router
  .route('/')
  .all(checkAuth)
  .get(async (req: Request, res: Response) => {
    try {
      const exams = await Exam.find({});

      res.send({
        message: 'Exams send successfully',
        data: exams,
        success: true,
      });
    } catch (err: any) {
      sendError(res, err);
    }
  })
  .post(async (req: Request, res: Response) => {
    try {
      const exists = await Exam.findOne({ name: req.body.name });

      if (exists) {
        return res.status(200).send({
          message: 'Exam already in use',
          success: false,
        });
      }

      const newExam = new Exam(req.body);
      await newExam.save();

      res.send({
        message: 'Exam added successfully',
        success: true,
      });
    } catch (err: any) {
      sendError(res, err);
    }
  });

router
  .route('/:exam_id')
  .all(checkAuth)
  .get(async (req: Request, res: Response) => {
    try {
      const id = req.params.exam_id;

      const exam = await Exam.findById(id).populate('questions');

      res.send({
        message: 'Exam send successfully',
        data: exam,
        success: true,
      });
    } catch (err: any) {
      sendError(res, err);
    }
  })
  .put(async (req: Request, res: Response) => {
    const id = req.params.exam_id;

    await Exam.findByIdAndUpdate(id, req.body);

    res.send({
      message: 'Exam updated successfully',
      succss: true,
    });
    try {
    } catch (err: any) {
      sendError(res, err);
    }
  })
  .delete(async (req: Request, res: Response) => {
    try {
      const id = req.params.exam_id;

      await Exam.findByIdAndDelete(id);

      res.send({
        message: 'Exam deleted successfully',
        success: true,
      });
    } catch (err: any) {
      sendError(res, err);
    }
  });

export default router;
