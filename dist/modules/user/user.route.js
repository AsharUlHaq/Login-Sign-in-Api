"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const auth_1 = require("../auth/auth");
const userRoutes = (0, express_1.Router)();
exports.userRoutes = userRoutes;
userRoutes.get("/signIn-Users", auth_1.FindAllUsersHandler);
userRoutes.post("/sign-Up", auth_1.createUserHandler);
userRoutes.post("/sign-in", auth_1.signInUserHandler);
