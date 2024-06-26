import type { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken"
import { ENV } from "../utils/env.util";

export async function protect(req: Request, response: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers.authorization; //it will check that authorization header received or not (authorization header contains bearer and token)
        if (!authorizationHeader) throw new Error('Unauthorized'); //if authorization header not found then it will print error
        const [bearer, token] = authorizationHeader.split(" ");//split function split authorization header and stored bearer value into bearer variable and token value into token variable

        //TO UNDERSTAND BEARER
        // const auth = "Bearer 54635634";
        // const [bearer, token] = auth.split(" ")
        // console.log(auth.split(" "))

        if (bearer != "Bearer") throw new Error('Unauthorized');
        if (!token) throw new Error('Unauthorized');

        const payload: any = verify(token, ENV.JWT_SECRET) //payload is the decryption, verify function will verify token with JWT SECRET stored in env file.
        const userId = payload.id;
        (req as any)['userId'] = userId;

        next()
    } catch (error: any) {
        response.status(401).json({ message: error.message })
    }
}