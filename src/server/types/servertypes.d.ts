declare namespace Express {
  export interface Request {
    user: UserType;
  }
}

declare interface UserType {
  id: string;
  name: string;
  email: string;
  password: string;
  profilePicture: string;
  country: string;
  managementType: string;
  memberType: string;
  rosterOrder: number;
  socialMedia: {
    type: string;
    link: string;
  }[];
  newPasswordRequired: boolean;
}

declare interface ApplicationType {
  _id: string;
  applicationType: string;
  username: string;
  age: number;
  discordId: string;
  portfolio: string;
  aboutYourself: string;
  previousExperience?: string;
  remarks?: string;
  dateSubmitted: string;
}

declare interface WallpaperType {
  _id: string;
  compressedImgUrl: string;
  fullImgUrl: string;
  author: string;
  socialMediaHandle: string;
  socialMediaLink: string;
  order: number;
}

declare interface ContactType {
  _id: string;
  name: string;
  email: string;
  country: string;
  companyName: string;
  message: string;
  dateSubmitted: string;
}

declare interface SocialMediaNumbers {
  socialMedia: [
    {
      type: 'twitter';
      ammount: number;
    },
    {
      type: 'instagram';
      ammount: number;
    },
    {
      type: 'tiktok';
      ammount: number;
    },
    {
      type: 'youtube';
      ammount: number;
    },
    {
      type: 'twitch';
      ammount: number;
    },
  ];
}
declare interface FaqType {
  _id: string;
  title: string;
  body: string;
  order: number;
}

declare module 'dotenv-safe/config';
