import { Router } from "express";
import { createUserHandler, FindAllUsersHandler, signInUserHandler } from "../auth/auth";


const userRoutes = Router();

userRoutes.get("/signIn-Users", FindAllUsersHandler)
userRoutes.post("/sign-Up", createUserHandler)
userRoutes.post("/sign-in", signInUserHandler)

export { userRoutes }