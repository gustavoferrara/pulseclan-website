import mongoose from 'mongoose';

const WallpaperSchema = new mongoose.Schema(
  {
    compressedImgUrl: {
      type: String,
      required: true,
    },
    fullImgUrl: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    socialMediaHandle: {
      type: String,
      required: true,
    },
    socialMediaLink: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
  },
  { collection: 'wallpapers' },
);

module.exports = mongoose.model('Wallpaper', WallpaperSchema);
