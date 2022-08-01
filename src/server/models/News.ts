import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
      required: true,
    },
  },
  { collection: 'news' },
);

module.exports = mongoose.model('News', NewsSchema);
