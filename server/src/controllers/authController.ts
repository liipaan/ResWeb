import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { User } from "../models/User.ts";

const registerSchema = z.object({
    name: z.string().trim().min(2).max(80),
    email: z.string().trim().email().max(254),
    password: z.string().min(8).max(100),
})
const loginSchema = z.object({
    email: z.string().trim().email(),
    password: z.string().min(8).max(100),
})
//make token expiration time configurable via env variable
function MakeToken(userId:string):string{
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET is not configured");
    return jwt.sign({ userId }, secret, {
    expiresIn: (process.env.JWT_EXPIRES_IN ||
    "1d") as jwt.SignOptions["expiresIn"],
});
}
export const register = async (req:Request, res:Response):Promise<void>=>{
    const parsed = registerSchema.safeParse(req.body);
    if(!parsed.success){
        res.status(400).json({ message: "Invalid input", errors:parsed.error.flatten()});
        return;
    }
    try{
    const name = parsed.data.name;
    const email = parsed.data.email.toLowerCase();
    const existingUser = await User.findOne({ email})
    if(existingUser){
        res.status(409).json({ message: "Email is already registered" });
    return;
    }
    const hashedPassword = await bcrypt.hash(parsed.data.password,  10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({
    message: "Account created",
    token: MakeToken(user.id),
    user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    },
    });
    }catch(error){
    if (
    error &&
    typeof error === "object" &&
    "code" in error &&
    error.code === 11000
    ) {
    res.status(409).json({ message: "Email is already registered" });
    return;
    }
    res.status(500).json({ message: "Could not create account" });
    }
}
export const login = async (req:Request, res:Response):Promise<void>=>{
    const parsed = loginSchema.safeParse(req.body);

if (!parsed.success) {
    res.status(400).json({ message: "Invalid login data" });
    return;
}
try {
    const email = parsed.data.email.toLowerCase();
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
    res.status(401).json({ message: "Email or password is incorrect" });
    return;
    }
    const valid = await bcrypt.compare(parsed.data.password, user.password);

    if (!valid) {
    res.status(401).json({ message: "Email or password is incorrect" });
    return;
    }
    res.json({
    message: "Login successful",
    token: MakeToken(user.id),
    user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    },
    });
} catch {
    res.status(500).json({ message: "Could not log in" });
}
}