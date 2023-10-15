import { randomBytes, scrypt, timingSafeEqual } from 'crypto';

// Node.js docs states that at salt must be random and at least 16 bytes long
// https://nodejs.org/api/crypto.html#cryptoscryptpassword-salt-keylen-options-callback
const SALT_LENGTH = 32;
const KEY_LENGTH = 64;

export class Password {
  private _salt: string;
  private _hash: string;

  get salt() {
    return this._salt;
  }

  get hash() {
    return this._hash;
  }

  private constructor(hash: string, salt: string) {
    this._hash = hash;
    this._salt = salt;
  }

  // Node.js also recommends to .normalize given password strings because some Unicode characters
  // can be represented in multiple ways
  // https://nodejs.org/api/crypto.html#using-strings-as-inputs-to-cryptographic-apis
  static create(password: string): Promise<Password> {
    return new Promise((resolve, reject) => {
      const salt = randomBytes(SALT_LENGTH).toString('hex');
      scrypt(password.normalize(), salt, KEY_LENGTH, (err, result) => {
        if (!err) {
          resolve(new Password(result.toString('hex'), salt));
        } else {
          reject(err);
        }
      });
    });
  }

  static from(password: string) {
    const splitted = password.split('.');

    return new Password(splitted[0], splitted[1]);
  }

  toString() {
    return `${this.hash}.${this.salt}`;
  }

  isCorrect(password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      scrypt(password.normalize(), this.salt, KEY_LENGTH, (err, result) => {
        if (!err) {
          resolve(timingSafeEqual(Buffer.from(this.hash, 'hex'), result));
        } else {
          reject(err);
        }
      });
    });
  }
}
