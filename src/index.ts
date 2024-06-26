import express from "express";
import { ENV } from "./utils/env.util";
import cors from 'cors';
import bodyParser from 'body-parser';
import { z } from "zod";
import { prisma } from "./utils/db.util";
import { sign } from 'jsonwebtoken'
import { protect } from "./middlewares/auth.middleware";
import { getAllUsers } from "./modules/user/user.service";
import { rest } from "lodash";
import { signInSchema, signUpSchema } from "./modules/user/user.schema";
import { userRoutes } from "./modules/user/user.route";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// app.post('/sign-up', async (req, res) => {
//     try {
//         const body = signUpSchema.parse(req.body);
//         await prisma.user.create({ data: body })

//         return res.json({ message: 'Registered Successfully' })
//     } catch (error: any) {
//         console.error(error);
//         return res.json({ message: error.message });
//     }
// })

// app.post('/sign-in', async (req, res) => {
//     try {
//         const body = signInSchema.parse(req.body);
//         const user = await prisma.user.findUnique({ where: { email: body.email } });
//         if (!user) throw new Error('User not found');
//         if (user.password != body.password) throw new Error('Invalid credentials');
//         const { password, ...rest } = user; //deleting password from user data for privacy
//         const token = sign(rest, ENV.JWT_SECRET, { expiresIn: "1d" })
//         // delete user.password

//         return res.json({ message: "Sign in successfully", data: { ...rest, token } })

//     } catch (error: any) {
//         console.error(error.message);
//         return res.json({ message: error.message })
//     }
// })

app.get("/", protect, (req, res) => {
    //@ts-ignore
    console.log(req.userId);

    return res.json({ message: "Wallah, Authorization Done" })
})

app.use('/', userRoutes)

// app.get('/signInUsers', async (req, res) => {
//     try {
//         const getAllUsers = await prisma.user.findMany({ select: { id: true, name: true, email: true, createdAt: true, updatedAt: true } });
//         res.status(200).json({ message: "Success", data: getAllUsers })
//         return getAllUsers;
//     }
//     catch (error: any) {
//         console.error(error.message)
//         res.status(400).json({ message: error.message });
//     }
// })


app.listen(ENV.PORT, () => {
    console.log(`Application running at http://localhost:${ENV.PORT}`)
})

