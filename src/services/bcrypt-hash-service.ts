import { injectable } from "inversify";
import { IHashService } from "./hash-service.type";
import bcrypt from 'bcryptjs';

@injectable()
export class BcryptHashService implements IHashService {
  readonly hasher = bcrypt;
  readonly SALT_LENGTH = 10;

  compare(text: string, hash: string): Promise<boolean> {
    return this.hasher.compare(text, hash);
  }

  hash(text: string): Promise<string> {
    return this.hasher.hash(text, this.SALT_LENGTH);
  }
}