import 'dotenv-safe/config';

import bcrypt from 'bcryptjs';
import { serialize } from 'cookie';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import auth from '../../middlewares/auth';

const User = require('../../models/User');

const router = express.Router();

//* Get user data if JWT token is available
router.get('/', auth, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    res.json(user);
  } catch (err: any) {
    res.status(500).json({ error: 'noToken' });
  }
});

//* Login user
router.post('/', async (req: Request, res: Response) => {
  const { email, password, stayLoggedIn } = req.body;

  try {
    const user: UserType = await User.findOne({ email });

    if (!user) {
      // Invalid credentials
      return res.status(400).json({ error: 'User not found!' });
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      return res.status(400).json({ error: 'Invalid credentials!' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    const cookieExpiration = stayLoggedIn
      ? 1000 * 60 * 60 * 24 * 365 * 10
      : undefined;

    const isHttpsCookie = process.env.NODE_ENV === 'production';

    jwt.sign(payload, process.env.JWTSECRET, {}, (err, token) => {
      if (err) throw err;

      const serialized = serialize('pulseToken', token!, {
        httpOnly: true,
        secure: isHttpsCookie,
        sameSite: 'lax',
        maxAge: cookieExpiration,
        path: '/',
      });

      res.setHeader('Set-Cookie', serialized);

      res.status(200).json({ msg: 'success' });
    });

    // console.log('User logged in', user);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

//* Logout
router.get('/logout', auth, async (req: Request, res: Response) => {
  try {
    const isHttpsCookie = process.env.NODE_ENV === 'production';

    const serialized = serialize('pulseToken', 'logoutCookie', {
      httpOnly: true,
      secure: isHttpsCookie,
      sameSite: 'lax',
      maxAge: 1,
      path: '/',
    });

    res.setHeader('Set-Cookie', serialized);

    res.status(200).json({ msg: 'success' });

    // console.log('User logged in', user);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

//* Authenticate if user has management level
//| only for testing purposes
// router.get(
//   '/management',
//   managementAuth,
//   async (req: Request, res: Response) => {
//     try {
//       const user: Pick<UserType, 'authLevel'> = await User.findById(
//         req.user.id,
//       ).select('authLevel');

//       if (user.authLevel < 1) {
//         return res.status(500).json({ error: 'unauthorized' });
//       }

//       res.status(200).json({ msg: 'authenticated' });
//     } catch (err: any) {
//       res.status(500).json({ error: 'noToken' });
//     }
//   },
// );

export default router;
