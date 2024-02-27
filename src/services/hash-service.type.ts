import { interfaces } from "inversify";

export interface IHashService {
  hash(text: string): Promise<string>;
  compare(text: string, hash: string): Promise<boolean>;
}

export const HashServiceType = Symbol.for('IHashService') as interfaces.ServiceIdentifier<IHashService>;