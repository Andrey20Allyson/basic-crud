import TestAgent from "supertest/lib/agent";
import { UserCreateDTO, UserCreateRequestDTO } from "../../dtos/user-create";
import { UserResponseDTO } from "../../dtos/user-response";

export class UserMocker {
  private _count: number = 0;

  constructor(readonly agent: TestAgent) { }

  async post(): Promise<UserResponseDTO> {
    const { body } = await this
      .agent
      .post('/users')
      .send({
        name: `Jhon Due (${this._count++})`,
        birthDate: new Date(2000, 0, 1),
        password: '123456',
      } satisfies UserCreateRequestDTO);

    return body;
  }

  async postMany(length: number): Promise<UserResponseDTO[]> {
    const array: UserResponseDTO[] = [];

    for (let i = 0; i < length; i++) {
      const user = await this.post();

      array.push(user);
    }

    return array;
  }
}