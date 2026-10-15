import type { Request, Response } from "express";
import { z } from "zod";
import { Food } from "../models/Food.ts";
import { Category } from "../models/Category.ts";

const foodSchema = z.object({
name: z.string().trim().min(2).max(120),
description: z.string().trim().max(1000).optional().default(""),
price: z.number().min(0),
imageUrl: z.string().url().or(z.literal("")).optional().default(""),
category: z.string().min(1),
available: z.boolean().optional().default(true),
});
export const  listFoods = async (_req: Request, res: Response): Promise<void>=> {
const foods = await Food.find().populate("category", "name").sort({ createdAt: -1 });
res.json(foods);
}
export const getFood = async (req:Request, res:Response):Promise<void>=>{
const food = await Food.findById(req.params.id).populate("category", "name");
if (!food) {
    res.status(404).json({ message: "Food not found" });
    return;
}
res.json(food);
}
export const  createFood = async (req:Request, res:Response):Promise<void>=>{
    const parsed = foodSchema.safeParse(req.body);
    if (!parsed.success) {
    res
    .status(400)
    .json({ message: "Invalid food data", errors: parsed.error.flatten() });
    return;
}
const categoryExists = await Category.exists({ _id: parsed.data.category });
if (!categoryExists) {
    res.status(400).json({ message: "Selected category does not exist" });
    return;
}

const food = await Food.create(parsed.data);
res.status(201).json(food);
}
export const updateFood = async (req:Request, res:Response):Promise<void>=>{
    const parsed = foodSchema.partial().safeParse(req.body);
    if (!parsed.success) {
    res
    .status(400)
    .json({ message: "Invalid food data", errors: parsed.error.flatten() });
    return;
}
if (parsed.data.category) {
    const categoryExists = await Category.exists({ _id: parsed.data.category });
    if (!categoryExists) {
    res.status(400).json({ message: "Selected category does not exist" });
    return;
    }
}
const food = await Food.findByIdAndUpdate(req.params.id, parsed.data, {
    new: true,
    runValidators: true,
});
if (!food) {
    res.status(404).json({ message: "Food not found" });
    return;
}
res.json(food);
}
export const deleteFood = async (req:Request, res:Response):Promise<void>=>{
    const food = await Food.findByIdAndDelete(req.params.id);
if (!food) {
    res.status(404).json({ message: "Food not found" });
    return;
}
res.json({ message: "Food deleted" })
}