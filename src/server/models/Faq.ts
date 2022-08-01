import mongoose from 'mongoose';

const FaqSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
  },
  { collection: 'faq' },
);

module.exports = mongoose.model('Faq', FaqSchema);
