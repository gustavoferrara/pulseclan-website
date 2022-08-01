import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    socialMedia: [
      new mongoose.Schema({
        type: String,
        link: String,
      }),
    ],
    profilePicture: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    // authLevel: {
    //   type: Number,
    //   required: true,
    // },
    managementType: {
      type: String,
      required: true,
    },
    memberType: {
      type: String,
      required: true,
    },
    rosterOrder: {
      type: Number,
      required: true,
    },
    newPasswordRequired: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { collection: 'users' },
);

module.exports = mongoose.model('User', UserSchema);
