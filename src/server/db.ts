import 'dotenv-safe/config';

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOURI!);

    console.log('Database connected');
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
