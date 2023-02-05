import dotenv from 'dotenv';

export const envConfig = (): EnvConfig => {
  const mode = process.env.NODE_ENV;
  if (!mode || mode === 'development') {
    dotenv.config();
  } else {
    // dotenv.config({ path: `.env.${mode}` });
    dotenv.config();
  }

  const port = parseInt(process.env.PORT) || 8080;

  return {
    mode,
    port,
    serverUrl: process.env.SERVER_URL || `http://localhost:8080`,
    clientUrl: process.env.CLIENT_URL || `http://localhost:3000`,
    sessionSecret: process.env.SESSION_SECRET || `some-very-strong-secret`,
    cookieSecret: process.env.COOKIE_SECRET || `some-very-strong-secret`,
  };
};

export interface EnvConfig {
  mode: string;
  port: number;
  serverUrl: string;
  clientUrl: string;
  sessionSecret: string;
  cookieSecret: string;
}
