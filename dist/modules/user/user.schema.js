"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInSchema = exports.signUpSchema = void 0;
const zod_1 = require("zod");
exports.signUpSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.signInSchema = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string(),
});
