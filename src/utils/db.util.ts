import { PrismaClient } from "@prisma/client";
const myGlobal = global as any;

if (!myGlobal['prisma']) myGlobal['prisma'] = new PrismaClient(); //globally check krega k prisma ka instance create hua wa h ya nh agar nh hua wa hoga tw create kr k export krdega
export const prisma = myGlobal['prisma'] as PrismaClient;
