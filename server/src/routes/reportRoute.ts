import express, { Router, Request, Response } from 'express';
import Report from '../models/ReportModel.js';
import Exam from '../models/ExamModel.js';
import User from '../models/UserModel.js';
import checkAuth from '../utils/checkAuth.js';
import sendError from '../utils/sendError.js';

const router: Router = express.Router();

router
  .route('/')
  .all(checkAuth)
  .get(async (req: Request, res: Response) => {
    try {
      const { exam, user } = req.query;

      const filterExam = exam
        ? { name: { $regex: new RegExp(exam as string, 'i') } }
        : {};
      const filterUser = user
        ? {
            $expr: {
              $regexMatch: {
                input: { $concat: ['$fname', ' ', '$lname'] },
                regex: user,
                options: 'i',
              },
            },
          }
        : {};

      const exams = await Exam.find(filterExam);

      const examIds = exams.map((exam) => exam._id);

      const users = await User.find(filterUser);

      const userIds = users.map((user) => user._id);

      const reports = await Report.find({
        exam: {
          $in: examIds,
        },
        user: {
          $in: userIds,
        },
      })
        .populate('exam')
        .populate('user')
        .sort({ createdAt: -1 });

      res.send({
        message: 'Reports send successfully',
        data: reports,
        success: true,
      });
    } catch (err: any) {
      sendError(res, err);
    }
  })
  .post(async (req: Request, res: Response) => {
    try {
      const newReport = new Report(req.body);

      await newReport.save();

      res.send({
        message: 'Report added successfully',
        data: { id: newReport._id },
        success: true,
      });
    } catch (err: any) {
      sendError(res, err);
    }
  });

router
  .route('/:user_id')
  .all(checkAuth)
  .get(async (req: Request, res: Response) => {
    const id = req.params.user_id;

    try {
      const reports = await Report.find({ user: id })
        .populate('exam')
        .populate('user')
        .sort({ createdAt: -1 });

      res.send({
        message: 'Reports send successfully',
        data: reports,
        success: true,
      });
    } catch (err: any) {
      sendError(res, err);
    }
  });

export default router;
