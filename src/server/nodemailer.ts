import 'dotenv-safe/config';

import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILERACCOUNT,
    pass: process.env.NODEMAILERPASSWORD,
  },
});

const prepareNodemailer = async () => {
  try {
    await transporter.verify();

    console.log('Nodemailer ready');
  } catch (err: any) {
    console.error(err.message);
  }
};

export default prepareNodemailer;
