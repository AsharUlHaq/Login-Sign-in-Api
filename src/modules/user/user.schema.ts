import { z } from "zod";

export const signUpSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
});

export type SignUpType = z.infer<typeof signUpSchema>

export const signInSchema = z.object({
    email: z.string(),
    password: z.string(),
})

export type SignInType = z.infer<typeof signInSchema>