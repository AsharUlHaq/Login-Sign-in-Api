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
exports.protect = protect;
const jsonwebtoken_1 = require("jsonwebtoken");
const env_util_1 = require("../utils/env.util");
function protect(req, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authorizationHeader = req.headers.authorization; //it will check that authorization header received or not (authorization header contains bearer and token)
            if (!authorizationHeader)
                throw new Error('Unauthorized'); //if authorization header not found then it will print error
            const [bearer, token] = authorizationHeader.split(" "); //split function split authorization header and stored bearer value into bearer variable and token value into token variable
            //TO UNDERSTAND BEARER
            // const auth = "Bearer 54635634";
            // const [bearer, token] = auth.split(" ")
            // console.log(auth.split(" "))
            if (bearer != "Bearer")
                throw new Error('Unauthorized');
            if (!token)
                throw new Error('Unauthorized');
            const payload = (0, jsonwebtoken_1.verify)(token, env_util_1.ENV.JWT_SECRET); //payload is the decryption, verify function will verify token with JWT SECRET stored in env file.
            const userId = payload.id;
            req['userId'] = userId;
            next();
        }
        catch (error) {
            response.status(401).json({ message: error.message });
        }
    });
}
