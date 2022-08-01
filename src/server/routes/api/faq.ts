import 'dotenv-safe/config';

import express, { Request, Response } from 'express';

import auth from '../../middlewares/auth';

const Faq = require('../../models/Faq');

const User = require('../../models/User');

const router = express.Router();

//* Add faq
router.post('/', auth, async (req: Request, res: Response) => {
  const { title, body } = req.body;

  try {
    const loggedUser: UserType = await User.findById(req.user.id);

    if (
      loggedUser.managementType !== 'general' &&
      loggedUser.managementType !== 'owner'
    ) {
      return res.status(400).json({ error: 'Unauthorized' });
    }

    const numberOfExistingFaqs = await Faq.find().countDocuments();

    const order = numberOfExistingFaqs + 1;

    const faq = new Faq({
      title,
      body,
      order,
    });

    await faq.save();

    return res.status(200).json({ msg: 'success' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

//* Modify faq
router.post('/manage', auth, async (req: Request, res: Response) => {
  const { _id, title, body } = req.body;

  let { order } = req.body;

  try {
    if (isNaN(Number(order))) {
      return res.status(400).json({
        error: 'The order can only be a number!',
      });
    }

    const loggedUser: UserType = await User.findById(req.user.id);

    if (
      loggedUser.managementType !== 'owner' &&
      loggedUser.managementType !== 'general'
    ) {
      return res.status(400).json({ error: 'Unauthorized' });
    }

    // const numberOfExistingFaqs = await Faq.find().countDocuments();

    // if (order < 1) {
    //   order = 1;
    // } else if (order > numberOfExistingFaqs) {
    //   order = numberOfExistingFaqs;
    // }

    const faqs: FaqType[] = await Faq.find();

    const highestOrderFaq = Math.max(...faqs.map(faq => faq.order));

    if (order < 1) {
      order = 1;
    } else if (order > highestOrderFaq) {
      order = highestOrderFaq;
    }

    const targetFaq: FaqType = await Faq.findOne({
      title,
    });

    const existingFaqByOrder: FaqType = await Faq.findOne({
      order,
    });

    if (existingFaqByOrder && existingFaqByOrder.title !== title) {
      await Faq.findOneAndUpdate(
        { order },
        {
          order: targetFaq.order,
        },
      );
    }

    await Faq.findByIdAndUpdate(_id, {
      title,
      body,
      order,
    });

    return res.status(200).json({ msg: 'success' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

//* Get all faq's
router.get('/', async (req: Request, res: Response) => {
  try {
    let faqs: FaqType[] = await Faq.find();

    faqs = faqs.sort((a, b) => a.order - b.order);

    res.status(200).json({ faqs });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

//* Delete faq
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

    await Faq.findByIdAndDelete(id);

    res.status(200).json({ msg: 'success' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
