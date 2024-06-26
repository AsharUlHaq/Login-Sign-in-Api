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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllUsersHandler = FindAllUsersHandler;
exports.createUserHandler = createUserHandler;
exports.signInUserHandler = signInUserHandler;
const user_service_1 = require("../user/user.service");
const zod_1 = require("zod");
const user_schema_1 = require("../user/user.schema");
const env_util_1 = require("../../utils/env.util");
const jsonwebtoken_1 = require("jsonwebtoken");
function FindAllUsersHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const findUsers = yield (0, user_service_1.getAllUsers)();
            res.status(200).json({ message: "Success", data: findUsers });
        }
        catch (error) {
            console.error(error.message);
            res.status(400).json({ message: error.message });
        }
    });
}
function createUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = user_schema_1.signUpSchema.parse(req.body);
            const user = yield (0, user_service_1.createUserProfile)(data);
            res.status(200).json({ message: "Success", data: user });
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const messageJSON = JSON.parse(error.message);
                const message = `${messageJSON[0].path[0]} is ${messageJSON[0].message}`;
                console.error(message);
                return res.status(400).json({ message: message });
            }
            console.error(error.message);
            return res.status(400).json({ message: error.message });
        }
    });
}
function signInUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = user_schema_1.signInSchema.parse(req.body);
            const user = yield (0, user_service_1.findUserByEmail)(data.email);
            if (!user)
                throw new Error('User not found');
            if (user.password != req.body.password)
                throw new Error('Invalid credentials');
            const { password } = user, rest = __rest(user, ["password"]); //deleting password from user data for privacy
            const token = (0, jsonwebtoken_1.sign)(rest, env_util_1.ENV.JWT_SECRET, { expiresIn: "1d" });
            // delete user.password
            return res.json({ message: "Sign in successfully", data: Object.assign(Object.assign({}, rest), { token }) });
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                //console.error(error.message);
                const messageJSON = JSON.parse(error.message);
                const message = `${messageJSON[0].path[0]} is ${messageJSON[0].message}`;
                console.error(message);
                return res.status(400).json({ message: message });
            }
            console.error(error.message);
            return res.json({ message: error.message });
        }
    });
}
