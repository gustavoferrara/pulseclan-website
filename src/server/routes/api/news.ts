import 'dotenv-safe/config';

import express, { Request, Response } from 'express';

import managementAuth from '../../middlewares/managementAuth';

const News = require('../../models/News');

const router = express.Router();
//| change to put request?
//* Update News
router.post('/', managementAuth, async (req: Request, res: Response) => {
  const { title, body, photoUrl } = req.body;

  try {
    await News.findOneAndUpdate({
      title,
      body,
      photoUrl,
    });

    return res.status(200).json({ msg: 'success' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

//* Get news
router.get('/', async (req: Request, res: Response) => {
  try {
    const news = await News.findOne();

    res.status(200).json({ news });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
