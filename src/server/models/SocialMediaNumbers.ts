import mongoose from 'mongoose';

const SocialMediaNumbersSchema = new mongoose.Schema(
  {
    socialMedia: [
      new mongoose.Schema({
        type: String,
        ammount: String,
      }),
    ],
  },
  { collection: 'socialmedianumbers' },
);

module.exports = mongoose.model('SocialMediaNumbers', SocialMediaNumbersSchema);
