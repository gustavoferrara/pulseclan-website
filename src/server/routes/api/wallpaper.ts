import 'dotenv-safe/config';

import express, { Request, Response } from 'express';

import auth from '../../middlewares/auth';

const Wallpaper = require('../../models/Wallpaper');
const User = require('../../models/User');

const router = express.Router();

//* Add wallpaper
router.post('/', auth, async (req: Request, res: Response) => {
  const {
    compressedImgUrl,
    fullImgUrl,
    author,
    socialMediaHandle,
    socialMediaLink,
  } = req.body;

  try {
    const loggedUser: UserType = await User.findById(req.user.id);

    if (
      loggedUser.managementType !== 'owner' &&
      loggedUser.managementType !== 'general' &&
      loggedUser.managementType !== 'designer'
    ) {
      return res.status(400).json({ error: 'Unauthorized' });
    }

    const numberOfExistingWallpapers = await Wallpaper.find().countDocuments();

    const order = numberOfExistingWallpapers + 1;

    const wallpaper = new Wallpaper({
      compressedImgUrl,
      fullImgUrl,
      author,
      socialMediaHandle,
      socialMediaLink,
      order,
    });

    await wallpaper.save();

    return res.status(200).json({ msg: 'success' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

//* Modify wallpaper
router.post('/manage', auth, async (req: Request, res: Response) => {
  const {
    _id,
    compressedImgUrl,
    fullImgUrl,
    author,
    socialMediaHandle,
    socialMediaLink,
  } = req.body;

  let { order } = req.body;

  try {
    if (isNaN(Number(order))) {
      return res.status(400).json({
        error: 'The order can only be a number!',
      });
    }

    const loggedUser: UserType = await User.findById(req.user.id);

    if (
      loggedUser.managementType !== 'owner' &&
      loggedUser.managementType !== 'general' &&
      loggedUser.managementType !== 'designer'
    ) {
      return res.status(400).json({ error: 'Unauthorized' });
    }

    // const numberOfExistingWallpapers = await Wallpaper.find().countDocuments();

    // if (order < 1) {
    //   order = 1;
    // } else if (order > numberOfExistingWallpapers) {
    //   order = numberOfExistingWallpapers;
    // }

    const wallpapers: WallpaperType[] = await Wallpaper.find();

    const highestOrderWallpaper = Math.max(
      ...wallpapers.map(wallpaper => wallpaper.order),
    );

    if (order < 1) {
      order = 1;
    } else if (order > highestOrderWallpaper) {
      order = highestOrderWallpaper;
    }

    const targetWallpaper: WallpaperType = await Wallpaper.findOne({
      compressedImgUrl,
    });

    const existingWallpaperByOrder: WallpaperType = await Wallpaper.findOne({
      order,
    });

    if (
      existingWallpaperByOrder &&
      existingWallpaperByOrder.compressedImgUrl !== compressedImgUrl &&
      existingWallpaperByOrder.fullImgUrl !== fullImgUrl
    ) {
      await Wallpaper.findOneAndUpdate(
        { order },
        {
          order: targetWallpaper.order,
        },
      );
    }

    await Wallpaper.findByIdAndUpdate(_id, {
      compressedImgUrl,
      fullImgUrl,
      author,
      socialMediaHandle,
      socialMediaLink,
      order,
    });

    return res.status(200).json({ msg: 'success' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

//* Delete wallpaper
router.delete('/manage/:id', auth, async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const loggedUser: UserType = await User.findById(req.user.id);

    if (
      loggedUser.managementType !== 'owner' &&
      loggedUser.managementType !== 'general' &&
      loggedUser.managementType !== 'designer'
    ) {
      return res.status(400).json({ error: 'Unauthorized' });
    }

    await Wallpaper.findByIdAndDelete(id);

    res.status(200).json({ msg: 'success' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

//* Get all wallpapers
router.get('/', async (req: Request, res: Response) => {
  try {
    let wallpapers: WallpaperType[] = await Wallpaper.find().select('-_id');

    wallpapers = wallpapers.sort((a, b) => a.order - b.order);

    res.status(200).json({ wallpapers });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

//* Get all wallpapers with id
router.get('/manage', auth, async (req: Request, res: Response) => {
  try {
    const loggedUser: UserType = await User.findById(req.user.id);

    if (
      loggedUser.managementType !== 'owner' &&
      loggedUser.managementType !== 'general' &&
      loggedUser.managementType !== 'designer'
    ) {
      return res.status(400).json({ error: 'Unauthorized' });
    }

    let wallpapers: WallpaperType[] = await Wallpaper.find();

    wallpapers = wallpapers.sort((a, b) => a.order - b.order);

    res.status(200).json({ wallpapers });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
