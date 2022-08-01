import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema(
  {
    applicationType: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    discordId: {
      type: String,
      required: true,
    },
    portfolio: {
      type: String,
      required: true,
    },
    aboutYourself: {
      type: String,
      required: true,
    },
    previousExperience: {
      type: String,
    },
    remarks: {
      type: String,
    },
    dateSubmitted: {
      type: Date,
      required: true,
      // default: Date.now,
    },
  },
  { collection: 'applications' },
);

module.exports = mongoose.model('Application', ApplicationSchema);
