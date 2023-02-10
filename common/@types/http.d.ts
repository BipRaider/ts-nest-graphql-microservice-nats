declare namespace Express {
  //TODO:
  interface Request {
    session?: {
      authToken?: {
        accessToken: string;
        refreshToken: string;
      };
      res: Response;
    };
  }
  interface Session {
    authToken?: {
      accessToken: string;
      refreshToken: string;
    };
  }
}
