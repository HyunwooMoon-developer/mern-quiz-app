import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authheader = req.headers.authorization;

    if (authheader) {
      const token = authheader.split('Bearer ')[1];

      if (token) {
        try {
          const decoded: any = jwt.verify(
            token,
            process.env.SECRET_TOKEN as string
          );
          const userID = decoded.userID;

          req.body.userID = userID;

          next();
        } catch (err) {
          res.status(401).send({
            message: 'Invalid/Expired Token',
            success: false,
          });
        }
      }
    } else {
      res.status(401).send({
        message: 'Authorization header must be provided',
        success: false,
      });
    }
  } catch (err) {
    res.status(401).send({
      message: 'UNAUTHENTICATED',
      data: err,
      success: false,
    });
  }
};

export default checkAuth;
