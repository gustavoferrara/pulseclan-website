import 'dotenv-safe/config';

import express, { Request, Response } from 'express';

import auth from '../../middlewares/auth';

const User = require('../../models/User');

const Contact = require('../../models/ContactSubmission');

const router = express.Router();

//* Submit contact form
router.post('/', async (req: Request, res: Response) => {
  const { name, email, country, companyName, message } = req.body;

  try {
    const dateSubmitted = new Date();

    const contact = new Contact({
      name,
      email,
      country,
      companyName,
      message,
      dateSubmitted,
    });

    await contact.save();

    return res.status(200).json({ msg: 'success' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

//* Get all contact submissions
router.get('/manage', auth, async (req: Request, res: Response) => {
  try {
    const loggedUser: UserType = await User.findById(req.user.id);

    if (
      loggedUser.managementType !== 'general' &&
      loggedUser.managementType !== 'owner'
    ) {
      return res.status(400).json({ error: 'Unauthorized' });
    }

    const contact = await Contact.find();

    res.status(200).json({ contact });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

//* Delete contact submission
router.delete('/manage/:id', auth, async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const loggedUser: UserType = await User.findById(req.user.id);

    if (
      loggedUser.managementType !== 'general' &&
      loggedUser.managementType !== 'owner'
    ) {
      return res.status(400).json({ error: 'Unauthorized' });
    }

    await Contact.findByIdAndDelete(id);

    res.status(200).json({ msg: 'success' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
