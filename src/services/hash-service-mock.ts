import { injectable } from "inversify";
import { IHashService } from "./hash-service.type";

@injectable()
export class HashServiceMock implements IHashService {
  async compare(text: string, hash: string): Promise<boolean> {
    return text === hash;  
  }

  async hash(text: string): Promise<string> {
    return text;
  }
}