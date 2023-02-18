import { PassportSerializer } from '@nestjs/passport';

export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: (err: Error, user: any) => void) {
    console.log('user', user);
    done(null, user);
  }

  deserializeUser(payload: any, done: (err: Error, payload: string) => void) {
    console.log('payload', payload);
    done(null, payload);
  }
}
