import { Prisma } from "@prisma/client";
import { prisma } from "../../utils/db.util";
import { signUpSchema, signInSchema } from "./user.schema";
import { request } from "express";
import { AnyARecord } from "dns";

export async function getAllUsers() {
    const allUsers = await prisma.user.findMany({ select: { email: true, name: true, id: true, createdAt: true } })
    return allUsers;
}

export async function createUserProfile(data: Prisma.UserUncheckedCreateInput) {
    try {
        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
            }
        })
    }
    catch (error: any) {
        if (error.code === 'P2002') {
            const target = error.meta.target[0];
            throw new Error(`${target} Must be unique`);
        }
        throw error
    }
}

export async function findUserByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email: email } });
    return user;
}