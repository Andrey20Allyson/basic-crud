import { z } from "zod";

export class IdPathParams {
  constructor(
    readonly id: number,
  ) { }
  
  static readonly schema = z.object({
    id: z.number({ coerce: true }),
  });
  
  static parse(data: unknown): IdPathParams {
    const { id } = IdPathParams.schema.parse(data);
    
    return new IdPathParams(id);
  }
}