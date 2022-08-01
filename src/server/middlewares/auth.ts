import 'dotenv-safe/config';

import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
//* Get JWT token if available and validate it, if correct then return user data
const auth = (req: Request, res: Response, next: NextFunction) => {
  // const token = req.header('x-auth-token');
  const token = req.cookies.pulseToken;

  if (!token) {
    return res.status(400).json({ error: 'noToken' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET!);

    //@ts-ignore
    req.user = (decoded as UserType).user;

    // console.log(req.user);

    next();
  } catch (err: any) {
    console.error('token not valid', err.message);
    res.status(500).json({ error: 'noToken' });
  }
};

export default auth;
