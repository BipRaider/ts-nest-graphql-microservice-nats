declare namespace NodeJS {
  interface ProcessEnv {
    //Email `SendGrid`
    readonly SENDGRID_API_KEY: string;
    readonly EMAIL_HOST: string;
    readonly EMAIL_PORT: string;
    readonly EMAIL_AUTH_USER: string;
    readonly EMAIL_AUTH_PASSWORD: string;
    // //Email `nodemailer`
    // readonly SMTP_SERVER: string | 'smtp.gmail.com';
    // readonly SMTP_LOGIN: string;
    // readonly SMTP_PASSWORD: string;
    // readonly SMTP_FROM_NAME: string;
    // readonly SMTP_FROM_EMAIL: string;
  }
}
