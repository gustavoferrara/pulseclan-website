declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: 'development' | 'production' | 'test';
      PORT: string;
      MONGOURI: string;
      JWTSECRET: string;
      NODEMAILERACCOUNT: string;
      NODEMAILERPASSWORD: string;
      NEXT_PUBLIC_CAPTCHASITEKEY: string;
      CAPTCHASECRETKEY: string;
      DISCORDWEBHOOKURL: string;
    }
  }
}

export {};
