import 'dotenv-safe/config';

import express, { Request, Response } from 'express';

import sendDiscordMessage from '../../discordWebhook';
import auth from '../../middlewares/auth';

const Application = require('../../models/Application');
const User = require('../../models/User');

const router = express.Router();
//| maybe TODO: on success, sign jwt token which expires after 10 days so user cant spam applications
//| also todo, maybe add rejection button which automatically sends email to applicant
//* Submit application
router.post('/', async (req: Request, res: Response) => {
  const {
    applicationType,
    username,
    age,
    discordId,
    portfolio,
    aboutYourself,
    previousExperience,
    remarks,
  } = req.body;

  const dateSubmitted = new Date();

  try {
    const application = new Application({
      applicationType,
      username,
      age,
      discordId,
      portfolio,
      aboutYourself,
      previousExperience,
      remarks,
      dateSubmitted,
    });

    await application.save();

    await sendDiscordMessage({
      title: `New ${applicationType} application`,
      description: `Username: ${username}
      Age: ${age}
      Discord id: ${discordId}
      Portfolio: ${portfolio}
      About yourself: ${aboutYourself}
      Previous experience: ${previousExperience}
      Remarks: ${remarks}
      Date submitted: ${dateSubmitted}`,
      url: process.env.DISCORDWEBHOOKURL,
    });

    return res.status(200).json({ msg: 'success' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

//* Get all applications
router.get('/', auth, async (req: Request, res: Response) => {
  try {
    const loggedUser: UserType = await User.findById(req.user.id);

    if (
      loggedUser.managementType !== 'owner' &&
      loggedUser.managementType !== 'general' &&
      loggedUser.managementType !== 'designer' &&
      loggedUser.managementType !== 'editor' &&
      loggedUser.managementType !== 'player'
    ) {
      return res.status(400).json({ error: 'Unauthorized' });
    }

    let applications: ApplicationType | null = null;

    if (
      loggedUser.managementType === 'owner' ||
      loggedUser.managementType === 'general'
    ) {
      applications = await Application.find();
    }

    if (loggedUser.managementType === 'designer') {
      applications = await Application.where({
        applicationType: 'designer',
      });
    }

    if (loggedUser.managementType === 'editor') {
      applications = await Application.where({
        applicationType: 'editor',
      });
    }

    if (loggedUser.managementType === 'player') {
      applications = await Application.where({
        applicationType: 'player',
      });
    }

    res.status(200).json({ applications });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

//* Delete application
router.delete('/:id/:sendEmail', auth, async (req: Request, res: Response) => {
  const { id, sendEmail } = req.params;

  console.log('send email', sendEmail);

  try {
    const loggedUser: UserType = await User.findById(req.user.id);
    const targetApplication: ApplicationType = await Application.findById(id);

    let authorized = false;

    if (
      loggedUser.managementType === 'owner' ||
      loggedUser.managementType === 'general'
    ) {
      authorized = true;
    }

    if (
      loggedUser.managementType === 'designer' &&
      targetApplication.applicationType === 'designer'
    ) {
      authorized = true;
    }

    if (
      loggedUser.managementType === 'editor' &&
      targetApplication.applicationType === 'editor'
    ) {
      authorized = true;
    }

    if (
      loggedUser.managementType === 'player' &&
      targetApplication.applicationType === 'player'
    ) {
      authorized = true;
    }

    if (!authorized) return res.status(400).json({ error: 'Unauthorized' });

    await Application.findByIdAndDelete(id);

    res.status(200).json({ msg: 'success' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
