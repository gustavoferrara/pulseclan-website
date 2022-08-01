import 'dotenv-safe/config';

import bcrypt from 'bcryptjs';
import express, { Request, Response } from 'express';

import auth from '../../middlewares/auth';
import managementAuth from '../../middlewares/managementAuth';
import { transporter } from '../../nodemailer';

const User = require('../../models/User');

const router = express.Router();

//* Create new user
router.post('/', auth, async (req: Request, res: Response) => {
  const {
    name,
    email,
    // password, //! for production remove the password here and uncomment the code below
    country,
    memberType,
    socialMedia,
  } = req.body;

  let { managementType, profilePicture } = req.body;

  try {
    const loggedUser: UserType = await User.findById(req.user.id).select(
      '-password',
    );

    if (loggedUser.managementType === 'none' || !loggedUser.managementType) {
      return res.status(400).json({ error: 'Unauthorized' });
    }

    let filledSocialMediaFields = 0;

    socialMedia.forEach((socialMedia: { type: string; link: string }) => {
      if (socialMedia.link !== '') filledSocialMediaFields++;
    });

    if (filledSocialMediaFields > 6) {
      return res.status(400).json({
        error: "You can't display more than 6 social media links at a time!",
      });
    }

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    if (loggedUser.managementType === 'general') {
      if (managementType === 'general' || managementType === 'owner') {
        return res.status(400).json({ error: 'Unauthorized' });
      }
    }

    if (
      loggedUser.managementType === 'contentCreator' &&
      memberType !== 'contentCreator'
    ) {
      return res.status(400).json({ error: 'Unauthorized' });
    }

    if (
      (loggedUser.managementType === 'designer' ||
        loggedUser.managementType === 'editor' ||
        loggedUser.managementType === 'player' ||
        loggedUser.managementType === 'contentCreator') &&
      (managementType !== 'none' || !managementType)
    ) {
      // if (managementType) {
      return res.status(400).json({ error: 'Unauthorized' });
      // }
    }

    // const password = `newpulseuser${Math.floor(
    //   Math.random() * (10000 - 1 + 1) + 1,
    // )}`;

    const password = '11111111';

    const rosterMembersCount = await User.where({
      memberType: memberType,
    }).countDocuments();

    const rosterOrder = rosterMembersCount + 1;

    if (
      loggedUser.managementType !== 'general' &&
      loggedUser.managementType !== 'owner'
    ) {
      managementType = 'none';
    }

    if (profilePicture === '') {
      profilePicture =
        'https://cdn.discordapp.com/attachments/305133368985518081/996424201823076403/defaultavi.jpg';
    }

    user = new User({
      name,
      email,
      password,
      profilePicture,
      country,
      managementType,
      memberType,
      rosterOrder,
      socialMedia,
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // await transporter.sendMail({
    //   from: '"Your password for the Pulse Clan website" <passwordrecovery@pulseclan.com>',
    //   to: email,
    //   subject: 'Your password for the Pulse Clan website',
    //   html: `
    //   <p>Hi ${user.name}, welcome to Pulse Clan! Your temporary password for the CMS section of the website is <b>${password}</b>. Once you log in, you'll be asked to change it. <a href="https://pulse-clan.com/cms/login">Login here</a></p> <br />
    //   <p>If you have any further questions please contact management.</p>
    //   `,
    // });

    res.status(200).json({ msg: 'success' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

//* Get all users for the public roster page
router.get('/roster', async (req: Request, res: Response) => {
  try {
    let users: UserType[] = await User.find().select(
      'name country profilePicture rosterOrder socialMedia memberType',
    );

    const rosterMembersCount = await User.where({
      memberType: 'designer',
    }).countDocuments();

    console.log(rosterMembersCount);

    users = users.filter(user => user.profilePicture !== undefined);

    res.status(200).json({ users });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

//* Get user data for profile page
router.get('/profile', auth, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    res.status(200).json({ user });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

//* Delete user
router.delete('/:email', auth, async (req: Request, res: Response) => {
  const { email } = req.params;

  try {
    const loggedUser: UserType = await User.findById(req.user.id).select(
      '-password',
    );

    const targetUser: UserType = await User.findOne({ email });

    if (loggedUser.managementType === 'none' || !loggedUser.managementType) {
      return res.status(400).json({ error: 'Unauthorized' });
    }

    if (targetUser.managementType === 'owner') {
      return res.status(400).json({ error: 'Unauthorized' });
    }

    if (
      loggedUser.managementType === 'general' &&
      targetUser.managementType === 'general'
    ) {
      return res.status(400).json({ error: 'Unauthorized' });
    }

    if (
      (loggedUser.managementType === 'designer' ||
        loggedUser.managementType === 'editor' ||
        loggedUser.managementType === 'player') &&
      targetUser.managementType !== 'none'
    ) {
      return res.status(400).json({ error: 'Unauthorized' });
    }

    const deletedUser: UserType = await User.findOne({ email });

    const rosterMembersCount = await User.where({
      memberType: deletedUser.memberType,
    }).countDocuments();

    await User.findOneAndDelete({ email });

    //! for loop reassign member roster order //
    // for (let i = deletedUser.rosterOrder; i < rosterMembersCount; i++) {
    //   const order = i + 1;

    //   await User.findOneAndUpdate(
    //     { rosterOrder: order, memberType: deletedUser.memberType },
    //     {
    //       rosterOrder: i,
    //     },
    //   );
    // }
    //! //

    // const membersInDeletedUserRoster = await User.where({
    //   memberType: targetUser.memberType,
    // }).countDocuments();

    // const membersInDeletedUserRoster: UserType[] = await User.where({
    //   memberType: targetUser.memberType,
    // });

    // const highestRosterOrderMember = Math.max(
    //   ...membersInDeletedUserRoster.map(member => member.rosterOrder),
    // );

    //|
    // https://stackoverflow.com/questions/39988848/trying-to-do-a-bulk-upsert-with-mongoose-whats-the-cleanest-way-to-do-this
    // https://www.npmjs.com/package/@meanie/mongoose-upsert-many
    // membersInDeletedUserRoster = membersInDeletedUserRoster.sort(
    //   (a, b) => a.rosterOrder - b.rosterOrder,
    // );

    // console.log(membersInDeletedUserRoster, membersInDeletedUserRoster2);

    //* get roster number, and for loop from that number until end of roster and rest - 1 to each member

    // await User.bulkWrite(
    //   membersInDeletedUserRoster.map((user, index) => ({
    //     updateOne: {
    //       filter: { id: doc.id },
    //       update: doc,
    //       upsert: true,
    //     },
    //   })),
    // );
    //|

    res.status(200).json({ msg: 'success' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

//* Update profile
router.post('/profile', auth, async (req: Request, res: Response) => {
  const { name, email, profilePicture, socialMedia } = req.body;

  try {
    let filledSocialMediaFields = 0;

    socialMedia.forEach((socialMedia: { type: string; link: string }) => {
      if (socialMedia.link !== '') filledSocialMediaFields++;
    });

    if (filledSocialMediaFields > 6) {
      return res.status(400).json({
        error: "You can't display more than 6 social media links at a time!",
      });
    }

    const loggedUser: UserType = await User.findById(req.user.id).select(
      '-password',
    );

    if (loggedUser.email !== email) {
      return res.status(400).json({ error: 'Unauthorized' });
    }

    const user = await User.findOneAndUpdate(
      { email },
      { name, profilePicture, socialMedia },
    );

    if (!user) {
      return res.status(400).json({ msg: 'No user found' });
    }

    res.status(200).json({ msg: 'success' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

//* Get all user profiles for managing page
router.get('/manage', auth, async (req: Request, res: Response) => {
  try {
    const loggedUser: UserType = await User.findById(req.user.id).select(
      '-password',
    );

    if (loggedUser.managementType === 'none' || !loggedUser.managementType) {
      return res.status(400).json({ error: 'Unauthorized' });
    }

    const users: UserType[] = await User.find().select('-password');

    const designerRoster = users
      .filter(member => member.memberType === 'designer')
      .sort((a, b) => a.rosterOrder - b.rosterOrder);

    const editorRoster = users
      .filter(member => member.memberType === 'editor')
      .sort((a, b) => a.rosterOrder - b.rosterOrder);

    const motionDesignerRoster = users
      .filter(member => member.memberType === 'motionDesigner')
      .sort((a, b) => a.rosterOrder - b.rosterOrder);

    const soundDesignerRoster = users
      .filter(member => member.memberType === 'soundDesigner')
      .sort((a, b) => a.rosterOrder - b.rosterOrder);

    const freestylerRoster = users
      .filter(member => member.memberType === 'freestyler')
      .sort((a, b) => a.rosterOrder - b.rosterOrder);

    const competitivePlayerRoster = users
      .filter(member => member.memberType === 'competitivePlayer')
      .sort((a, b) => a.rosterOrder - b.rosterOrder);

    const contentCreatorRoster = users
      .filter(member => member.memberType === 'contentCreator')
      .sort((a, b) => a.rosterOrder - b.rosterOrder);

    const managementRoster = users
      .filter(member => member.memberType === 'management')
      .sort((a, b) => a.rosterOrder - b.rosterOrder);

    const moderatorRoster = users
      .filter(member => member.memberType === 'moderator')
      .sort((a, b) => a.rosterOrder - b.rosterOrder);

    if (loggedUser.managementType === 'designer') {
      return res.status(200).json({
        members: {
          designerRoster,
          motionDesignerRoster,
          soundDesignerRoster,
        },
      });
    }

    if (loggedUser.managementType === 'editor') {
      return res.status(200).json({
        members: {
          editorRoster,
          motionDesignerRoster,
          soundDesignerRoster,
        },
      });
    }

    if (loggedUser.managementType === 'player') {
      return res.status(200).json({
        members: {
          freestylerRoster,
          competitivePlayerRoster,
        },
      });
    }

    res.status(200).json({
      members: {
        managementRoster,
        contentCreatorRoster,
        freestylerRoster,
        competitivePlayerRoster,
        designerRoster,
        editorRoster,
        motionDesignerRoster,
        soundDesignerRoster,
        moderatorRoster,
      },
    });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

//* Modify user
router.post('/manage', auth, async (req: Request, res: Response) => {
  const {
    name,
    email,
    profilePicture,
    country,
    managementType,
    memberType,
    socialMedia,
  } = req.body;

  let { rosterOrder } = req.body;

  try {
    const loggedUser: UserType = await User.findById(req.user.id).select(
      '-password',
    );

    let filledSocialMediaFields = 0;

    socialMedia.forEach((socialMedia: { type: string; link: string }) => {
      if (socialMedia.link !== '') filledSocialMediaFields++;
    });

    if (filledSocialMediaFields > 6) {
      return res.status(400).json({
        error: "You can't display more than 6 social media links at a time!",
      });
    }

    if (typeof rosterOrder !== 'number') {
      return res.status(400).json({
        error: 'The roster order can only be a number!',
      });
    }

    if (loggedUser.managementType === 'none' || !loggedUser.managementType) {
      return res.status(400).json({ error: 'Unauthorized' });
    }

    const targetUser: UserType = await User.findOne({ email });

    if (!targetUser) {
      return res.status(400).json({ error: 'User not found' });
    }

    if (loggedUser.managementType === 'general') {
      if (
        managementType === 'general' ||
        managementType === 'owner' ||
        targetUser.managementType === 'general' ||
        targetUser.managementType === 'owner'
      ) {
        return res.status(400).json({ error: 'Unauthorized' });
      }
    }

    if (loggedUser.managementType === 'contentCreator') {
      if (
        managementType !== 'none' ||
        memberType !== 'contentCreator' ||
        targetUser.managementType !== 'none' ||
        targetUser.memberType !== 'contentCreator'
      ) {
        return res.status(400).json({ error: 'Unauthorized' });
      }
    }

    if (loggedUser.managementType === 'designer') {
      if (
        managementType !== 'none' ||
        memberType === 'freestyler' ||
        memberType === 'competitivePlayer' ||
        memberType === 'management' ||
        memberType === 'moderator' ||
        memberType === 'editor' ||
        memberType === 'contentCreator' ||
        targetUser.memberType === 'freestyler' ||
        targetUser.memberType === 'competitivePlayer' ||
        targetUser.memberType === 'management' ||
        targetUser.memberType === 'moderator' ||
        targetUser.memberType === 'editor' ||
        targetUser.memberType === 'contentCreator'
      ) {
        return res.status(400).json({ error: 'Unauthorized' });
      }
    }

    if (loggedUser.managementType === 'editor') {
      if (
        managementType !== 'none' ||
        memberType === 'freestyler' ||
        memberType === 'competitivePlayer' ||
        memberType === 'management' ||
        memberType === 'moderator' ||
        memberType === 'designer' ||
        memberType === 'contentCreator' ||
        targetUser.memberType === 'freestyler' ||
        targetUser.memberType === 'competitivePlayer' ||
        targetUser.memberType === 'management' ||
        targetUser.memberType === 'moderator' ||
        targetUser.memberType === 'designer' ||
        targetUser.memberType === 'contentCreator'
      ) {
        return res.status(400).json({ error: 'Unauthorized' });
      }
    }

    if (loggedUser.managementType === 'player') {
      if (
        managementType !== 'none' ||
        memberType === 'soundDesigner' ||
        memberType === 'motionDesigner' ||
        memberType === 'management' ||
        memberType === 'moderator' ||
        memberType === 'designer' ||
        memberType === 'editor' ||
        targetUser.memberType === 'soundDesigner' ||
        targetUser.memberType === 'motionDesigner' ||
        targetUser.memberType === 'management' ||
        targetUser.memberType === 'moderator' ||
        targetUser.memberType === 'designer' ||
        targetUser.memberType === 'editor'
      ) {
        return res.status(400).json({ error: 'Unauthorized' });
      }
    }

    // const rosterMembersCount = await User.where({
    //   memberType: memberType,
    // }).countDocuments();

    // if (rosterOrder < 1) {
    //   rosterOrder = 1;
    // } else if (rosterOrder > rosterMembersCount) {
    //   rosterOrder = rosterMembersCount;
    // }

    const membersInUserRoster: UserType[] = await User.where({
      memberType: targetUser.memberType,
    });

    const highestRosterOrderMember = Math.max(
      ...membersInUserRoster.map(member => member.rosterOrder),
    );

    if (rosterOrder < 1) {
      rosterOrder = 1;
    } else if (rosterOrder > highestRosterOrderMember) {
      rosterOrder = highestRosterOrderMember;
    }

    const existingRosterOrderMember = await User.findOne({ rosterOrder });

    if (
      existingRosterOrderMember &&
      existingRosterOrderMember.email !== targetUser.email
    ) {
      await User.findOneAndUpdate(
        { rosterOrder },
        {
          rosterOrder: targetUser.rosterOrder,
        },
      );
    }

    if (
      loggedUser.managementType === 'owner' ||
      loggedUser.managementType === 'general'
    ) {
      await User.findOneAndUpdate(
        { email },
        {
          name,
          profilePicture,
          country,
          memberType,
          rosterOrder,
          socialMedia,
          managementType,
        },
      );
    } else {
      await User.findOneAndUpdate(
        { email },
        {
          name,
          profilePicture,
          country,
          memberType,
          rosterOrder,
          socialMedia,
        },
      );
    }

    return res.status(200).json({ msg: 'Success' });

    // res.status(400).json({ error: 'Unauthorized' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;

// if (loggedUser.managementType === 'owner') {
//   await User.findOneAndUpdate(
//     { email },
//     {
//       name,
//       profilePicture,
//       country,
//       memberType,
//       rosterOrder,
//       socialMedia,
//       managementType,
//     },
//   );

//   return res.status(200).json({ msg: 'Success' });
// }

// if (loggedUser.managementType === 'general') {
//   if (
//     managementType === 'designer' ||
//     managementType === 'editor' ||
//     managementType === 'player'
//   ) {
//     await User.findOneAndUpdate(
//       { email },
//       {
//         name,
//         profilePicture,
//         country,
//         memberType,
//         rosterOrder,
//         socialMedia,
//         managementType,
//       },
//     );

//     return res.status(200).json({ msg: 'Success' });
//   }
// }

// if (loggedUser.managementType === 'designer') {
//   if (
//     !managementType &&
//     (memberType === 'designer' ||
//       memberType === 'motionDesigner' ||
//       memberType === 'soundDesigner')
//   ) {
//     await User.findOneAndUpdate(
//       { email },
//       {
//         name,
//         profilePicture,
//         country,
//         memberType,
//         rosterOrder,
//         socialMedia,
//       },
//     );

//     return res.status(200).json({ msg: 'Success' });
//   }
// }

// if (loggedUser.managementType === 'editor') {
//   if (
//     !managementType &&
//     (memberType === 'editor' ||
//       memberType === 'motionDesigner' ||
//       memberType === 'soundDesigner')
//   ) {
//     await User.findOneAndUpdate(
//       { email },
//       {
//         name,
//         profilePicture,
//         country,
//         memberType,
//         rosterOrder,
//         socialMedia,
//       },
//     );

//     return res.status(200).json({ msg: 'Success' });
//   }
// }

// if (loggedUser.managementType === 'player') {
//   if (
//     !managementType &&
//     (memberType === 'player' ||
//       memberType === 'motionDesigner' ||
//       memberType === 'soundDesigner')
//   ) {
//     await User.findOneAndUpdate(
//       { email },
//       {
//         name,
//         profilePicture,
//         country,
//         memberType,
//         rosterOrder,
//         socialMedia,
//       },
//     );

//     return res.status(200).json({ msg: 'Success' });
//   }
// }
