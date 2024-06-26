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
exports.getAllSignInUsers = getAllSignInUsers;
const user_service_1 = require("./user.service");
function getAllSignInUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const signIn = yield (0, user_service_1.signInUsers)();
            res.status(200).json({ message: "Success", data: signIn });
        }
        catch (error) {
            console.error(error.message);
            res.status(400).json({ message: error.message });
        }
    });
}
