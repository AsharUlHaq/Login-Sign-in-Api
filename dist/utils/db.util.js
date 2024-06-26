"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const myGlobal = global;
if (!myGlobal['prisma'])
    myGlobal['prisma'] = new client_1.PrismaClient(); //globally check krega k prisma ka instance create hua wa h ya nh agar nh hua wa hoga tw create kr k export krdega
exports.prisma = myGlobal['prisma'];
