import {z} from 'zod';

export const usernameValidation = z
    .string()
    .min(4, 'username must be atleast 4 characters')
    .max(20, 'username must be atmost 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'username must not contain special character');

export const signUpSchema = z.object({
    username: usernameValidation,
    firstName: z.string().min(3, {message: 'first name must be atleast 3 characters'}),
    lastName: z.string(),
    email: z.string().email({message: 'invalid email'}),
    password: z.string().min(8, {message: 'password must be atleast 8 characters'}),
    DOB: z.string().min(1),
});