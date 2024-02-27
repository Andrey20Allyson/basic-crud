import { PrismaClient } from "@prisma/client";
import { interfaces } from "inversify";

export const PrismaClientType = Symbol.for('PrismaClient') as interfaces.ServiceIdentifier<PrismaClient>;