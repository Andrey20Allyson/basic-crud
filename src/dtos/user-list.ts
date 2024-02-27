import { z } from "zod";

export class UserListQueryParams {
  constructor(
    readonly page?: number,
  ) { }
  
  static readonly schema = z.object({
    page: z.number({ coerce: true }).optional(),
  });

  static parse(data: unknown): UserListQueryParams {
    const { page } = UserListQueryParams.schema.parse(data);

    return new UserListQueryParams(page);
  }
}