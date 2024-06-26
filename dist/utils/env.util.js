"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.ENV = {
    PORT: (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 5000,
    JWT_SECRET: (_b = process.env.JWT_SECRET) !== null && _b !== void 0 ? _b : "SECRET" //JWT Secret key
};
