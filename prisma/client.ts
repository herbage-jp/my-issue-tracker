// prisma/client.ts
import { PrismaClient } from "../app/generated/prisma"

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma || new PrismaClient();

// Always cache the Prisma instance in both development and production
globalForPrisma.prisma = prisma;