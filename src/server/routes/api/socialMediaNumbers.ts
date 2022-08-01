import 'dotenv-safe/config';

import express, { Request, Response } from 'express';

import auth from '../../middlewares/auth';

const SocialMediaNumbers = require('../../models/SocialMediaNumbers');

const User = require('../../models/User');

const router = express.Router();
// change to put request?
//* Update numbers
router.post('/manage', auth, async (req: Request, res: Response) => {
  const { socialMedia }: SocialMediaNumbers = req.body;

  try {
    const loggedUser: UserType = await User.findById(req.user.id);

    if (
      loggedUser.managementType !== 'general' &&
      loggedUser.managementType !== 'owner'
    ) {
      return res.status(400).json({ error: 'Unauthorized' });
    }

    await SocialMediaNumbers.findOneAndDelete();

    const newNumbers = new SocialMediaNumbers({
      socialMedia,
    });

    await newNumbers.save();

    return res.status(200).json({ msg: 'success' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

//* Get numbers
router.get('/', async (req: Request, res: Response) => {
  try {
    const numbers = await SocialMediaNumbers.findOne();

    res.status(200).json({ numbers });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
