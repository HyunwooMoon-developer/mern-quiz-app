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
      const { exam, user } = req.body;

      const exams = await Exam.find({
        name: {
          $regex: exam,
        },
      });

      const examIds = exams.map((exam) => exam._id);

      const users = await User.find({
        name: {
          $regex: user,
        },
      });

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
    try {
      const reports = await Report.find({ user: req.body.userID })
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
