import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User.ts";
export interface AuthRequest extends Request {
    userId?: string;
userRole?: "customer" | "admin";
}
interface TokenPayload {
    userId: string;
}
export const requireAuth = async(  req: AuthRequest,res: Response,next: NextFunction):Promise<void>=>{
    try {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Authentication required" });
    return;
    }
    const token = header.slice("Bearer ".length);
    const secret = process.env.JWT_SECRET;
    if (!secret) {
    res.status(500).json({ message: "JWT_SECRET is not configured" });
    return;
    }
    const decoded = jwt.verify(token, secret) as TokenPayload;
    const user = await User.findById(decoded.userId).select("_id role");
    if (!user) {
    res.status(401).json({ message: "User no longer exists" });
    return;
    }
    req.userId = user.id;
    req.userRole = user.role as "customer" | "admin";
    next();
    }catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
    }
}
export const requireAdmin =(req: AuthRequest,res: Response,next: NextFunction): void=>{
    if (!req.userId) {
    res.status(401).json({ message: "Authentication required" });
    return;
}
if (req.userRole !== "admin") {
    res.status(403).json({ message: "Admin access required" });
    return;
}

next();
}
