import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
    },
    message: {
      type: String,
      required: true,
    },
    dateSubmitted: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: 'contactsubmissions' },
);

module.exports = mongoose.model('Contact', ContactSchema);
