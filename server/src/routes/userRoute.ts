import express, { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import checkAuth from '../utils/checkAuth.js';
import User from '../models/UserModel.js';
import sendError from '../utils/sendError.js';

const router: Router = express.Router();

router.route('/register').post(async (req: Request, res: Response) => {
  try {
    const existUser = await User.findOne({ email: req.body.email });

    if (existUser) {
      return res.send({
        message: 'User already exists',
        success: false,
      });
    }

    const newUser = new User(req.body);
    await newUser.save();

    return res.status(200).send({
      message: 'User created successfully',
      success: true,
    });
  } catch (err: any) {
    sendError(res, err);
  }
});

router.route('/login').post(async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({
        message: 'User does not exist',
        success: false,
      });
    }

    const checkPW = await user.comparePassword(req.body.password);

    if (!checkPW) {
      return res.status(400).send({
        message: 'Invalid Password',
        success: false,
      });
    }

    const token = jwt.sign(
      { userID: user._id },
      process.env.SECRET_TOKEN as string,
      {
        expiresIn: '1d',
      }
    );

    res.send({
      message: 'Login successfully',
      success: true,
      data: token,
    });
  } catch (err: any) {
    sendError(res, err);
  }
});

router
  .route('/user')
  .all(checkAuth)
  .get(async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.body.userID);

      res.send({
        message: 'User info send successfully',
        success: true,
        data: user,
      });
    } catch (err: any) {
      sendError(res, err);
    }
  });

export default router;
