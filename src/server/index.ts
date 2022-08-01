import 'dotenv-safe/config';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import next from 'next';

import connectDB from './db';
import prepareNodemailer from './nodemailer';
import applicationRouter from './routes/api/application';
import authRouter from './routes/api/auth';
import contactRouter from './routes/api/contactSubmission';
import faqRouter from './routes/api/faq';
import newsRouter from './routes/api/news';
import passwordRouter from './routes/api/password';
import socialMediaRouter from './routes/api/socialMediaNumbers';
import userRouter from './routes/api/users';
import wallpaperRouter from './routes/api/wallpaper';

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    connectDB();
    prepareNodemailer();

    server.use(
      mongoSanitize({
        allowDots: true,
        replaceWith: '_',
        onSanitize: ({ req, key }) => {
          console.warn(`This request[${key}] has been sanitized`, req);
        },
      }),
    );

    server.use(cookieParser());

    server.use(
      cors({
        origin: [
          'http://localhost:3000',
          'https://pulse-clan.com',
          'http://190.246.179.221:3000',
        ],
        credentials: true,
      }),
    );

    server.use(express.json());

    server.use('/api/users', userRouter);
    server.use('/api/auth', authRouter);
    server.use('/api/password', passwordRouter);
    server.use('/api/applications', applicationRouter);
    server.use('/api/contact', contactRouter);
    server.use('/api/faq', faqRouter);
    server.use('/api/news', newsRouter);
    server.use('/api/socialmedia', socialMediaRouter);
    server.use('/api/wallpapers', wallpaperRouter);

    server.all('*', (req: Request, res: Response) => {
      return handle(req, res);
    });

    // server.use(express.static) necessary?
    // https://stackoverflow.com/questions/10434001/static-files-with-express-js

    // if (!dev) {
    //   // server.use(express.static('../.next/static'));
    //   server.use(express.static('../public'));
    // }

    server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((err: any) => {
    console.error(err.stack);
    process.exit(1);
  });

// server.get('/api/test', (req: Request, res: Response) => {
//   return res.end('we made it biaitch');
// });
