import { Request, Response } from "express";
import { createUserProfile, getAllUsers, findUserByEmail } from "../user/user.service";
import { nullable, string, ZodError } from "zod";
import { signInSchema, signUpSchema } from "../user/user.schema";
import { ENV } from "../../utils/env.util";
import { sign } from "jsonwebtoken";

export async function FindAllUsersHandler(req: Request, res: Response) {
    try {
        const findUsers = await getAllUsers();
        res.status(200).json({ message: "Success", data: findUsers })
    }
    catch (error: any) {
        console.error(error.message)
        res.status(400).json({ message: error.message })
    }
}

export async function createUserHandler(req: Request, res: Response) {
    try {
        const data = signUpSchema.parse(req.body);
        const user = await createUserProfile(data);
        res.status(200).json({ message: "Success", data: user })
    }
    catch (error: any) {
        if (error instanceof ZodError) {
            const messageJSON = JSON.parse(error.message);
            const message = `${messageJSON[0].path[0]} is ${messageJSON[0].message}`;
            console.error(message);
            return res.status(400).json({ message: message });

        }
        console.error(error.message);
        return res.status(400).json({ message: error.message });
    }
}

export async function signInUserHandler(req: Request, res: Response) {
    try {
        const data = signInSchema.parse(req.body);
        const user = await findUserByEmail(data.email)
        if (!user) throw new Error('User not found');
        if (user.password != req.body.password) throw new Error('Invalid credentials');
        const { password, ...rest } = user; //deleting password from user data for privacy
        const token = sign(rest, ENV.JWT_SECRET, { expiresIn: "1d" })
        // delete user.password

        return res.json({ message: "Sign in successfully", data: { ...rest, token } })

    }
    catch (error: any) {
        if (error instanceof ZodError) {
            //console.error(error.message);
            const messageJSON = JSON.parse(error.message);
            const message = `${messageJSON[0].path[0]} is ${messageJSON[0].message}`;
            console.error(message);
            return res.status(400).json({ message: message })
        }
        console.error(error.message);
        return res.json({ message: error.message })
    }

}