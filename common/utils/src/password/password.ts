import { randomBytes, pbkdf2 } from 'node:crypto';
import { promisify } from 'util';
import { Injectable } from '@nestjs/common';

export interface ICompare {
  hashed: string;
  password: string;
}

export interface IHash {
  password: string;
  salt?: string;
}

@Injectable()
export class PasswordUtil {
  public passwordLength = 128;
  public saltLen = 16;
  public iterations = 10000;
  public digest = 'sha512';

  /*** Password hash */
  hash = async ({ password, salt }: IHash): Promise<string> => {
    salt = salt || randomBytes(this.saltLen).toString('hex').slice(0, this.saltLen);
    const hash = await promisify(pbkdf2)(
      password,
      salt,
      this.iterations,
      this.passwordLength,
      this.digest,
    );
    return [salt, this.iterations.toString(), hash.toString('hex')].join('.');
  };

  hashData = async ({ password, salt }: Required<IHash>): Promise<string> => {
    const hash = await promisify(pbkdf2)(
      password,
      salt,
      this.iterations,
      this.passwordLength,
      this.digest,
    );
    return hash.toString('hex');
  };
  /*** Validation the password */
  compare = async ({ hashed, password }: ICompare): Promise<boolean> => {
    try {
      const [salt, iterations, hash] = hashed.split('.');
      if (!iterations || !hash) throw new Error('Credentials invalid');
      const checkHashed = await this.hash({ password, salt });
      if (checkHashed !== hashed) throw new Error('Credentials invalid');
      return true;
    } catch (error) {
      throw new Error('Credentials invalid');
    }
  };
  /*** Random password */
  static createPassword = (size?: number): string => {
    return randomBytes(size || 10)
      .toString('hex')
      .slice(0, size || 10)
      .toUpperCase();
  };
  /*** Random byte */
  static randomBytes = (size = 48): string => {
    return randomBytes(size).toString('hex').slice(0, size);
  };
}
