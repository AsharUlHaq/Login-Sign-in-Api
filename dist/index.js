"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const env_util_1 = require("./utils/env.util");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const auth_middleware_1 = require("./middlewares/auth.middleware");
const user_route_1 = require("./modules/user/user.route");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
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
app.get("/", auth_middleware_1.protect, (req, res) => {
    //@ts-ignore
    console.log(req.userId);
    return res.json({ message: "Wallah, Authorization Done" });
});
app.use('/', user_route_1.userRoutes);
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
app.listen(env_util_1.ENV.PORT, () => {
    console.log(`Application running at http://localhost:${env_util_1.ENV.PORT}`);
});
