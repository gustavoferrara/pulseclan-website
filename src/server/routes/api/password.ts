import 'dotenv-safe/config';

import bcrypt from 'bcryptjs';
import express, { Request, Response } from 'express';
import randomWords from 'random-words';

import auth from '../../middlewares/auth';
import { transporter } from '../../nodemailer';

const User = require('../../models/User');

const router = express.Router();

//* Change password
router.post('/reset', auth, async (req: Request, res: Response) => {
  try {
    const {
      inputCurrentPassword,
      inputNewPassword,
    }: { inputCurrentPassword: string; inputNewPassword: string } = req.body;

    const user: { id: string; password: string } = await User.findById(
      req.user.id,
    ).select('password');

    const passwordsMatch = await bcrypt.compare(
      inputCurrentPassword,
      user.password,
    );

    if (!passwordsMatch) {
      return res
        .status(400)
        .json({ error: 'Your current password is incorrect!' });
    }

    const salt = await bcrypt.genSalt(10);

    const encryptedPassword = await bcrypt.hash(inputNewPassword, salt);

    await User.findByIdAndUpdate(user.id, {
      password: encryptedPassword,
      newPasswordRequired: false,
    });

    res.status(200).json({ msg: 'success' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

//* Lost password
router.post('/lost', async (req: Request, res: Response) => {
  const { inputEmail } = req.body;

  try {
    const user: { name: string; id: string } = await User.findOne({
      email: inputEmail,
    }).select('name');

    if (!user) {
      console.log('User not found for lost password attempt');
      // return res.status(400).json({ error: 'User not found!' });
      return res.status(200).json({ msg: 'success' });
    }

    const newTempPassword = `recoverypassword${randomWords({
      exactly: 2,
      join: '',
    })}${Math.floor(Math.random() * (1000 - 1 + 1) + 1)}`;

    const salt = await bcrypt.genSalt(10);

    const encryptedPassword = await bcrypt.hash(newTempPassword, salt);

    await User.findOneAndUpdate(
      { email: inputEmail },
      { password: encryptedPassword, newPasswordRequired: true },
    );

    //* Send email to user

    await transporter.sendMail({
      from: '"Password recovery" <passwordrecovery@pulseclan.com>',
      to: inputEmail,
      subject: "Recover your Pulse Clan account's password",
      html: `
      <p>Hi ${user.name}, your new temporary password for the Pulse Clan website is <b>${newTempPassword}</b></p> <br />
      <b>IF YOU HAVEN'T PERFORMED THIS ACTION, PLEASE CONTACT MANAGEMENT</b>
      `,
    });

    res.status(200).json({ msg: 'success' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

//* New password after user creation / lost password reset
router.post('/new', auth, async (req: Request, res: Response) => {
  try {
    const { newPassword }: { newPassword: string } = req.body;

    const salt = await bcrypt.genSalt(10);

    const encryptedPassword = await bcrypt.hash(newPassword, salt);

    await User.findByIdAndUpdate(req.user.id, {
      password: encryptedPassword,
      newPasswordRequired: false,
    });

    res.status(200).json({ msg: 'success' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
