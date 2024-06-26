"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = getAllUsers;
exports.createUserProfile = createUserProfile;
exports.findUserByEmail = findUserByEmail;
const db_util_1 = require("../../utils/db.util");
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const allUsers = yield db_util_1.prisma.user.findMany({ select: { email: true, name: true, id: true, createdAt: true } });
        return allUsers;
    });
}
function createUserProfile(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield db_util_1.prisma.user.create({
                data: {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                }
            });
        }
        catch (error) {
            if (error.code === 'P2002') {
                const target = error.meta.target[0];
                throw new Error(`${target} Must be unique`);
            }
            throw error;
        }
    });
}
function findUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield db_util_1.prisma.user.findUnique({ where: { email: email } });
        return user;
    });
}
