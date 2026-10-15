import type { Request, Response } from "express";
import { z } from "zod";
import { Category } from "../models/Category.ts";
import { Food } from "../models/Food.ts";

const categorySchema = z.object({
name: z.string().trim().min(2).max(60),
description: z.string().trim().max(300).optional().default(""),
});

export const listCategories = async (
_req: Request,
res: Response,
): Promise<void> => {
res.json(await Category.find().sort({ name: 1 }));
}

export const createCategory = async (
req: Request,
res: Response,
): Promise<void> => {
const parsed = categorySchema.safeParse(req.body);
if (!parsed.success) {
    res.status(400).json({ message: "Invalid category data" });
    return;
}

try {
    res.status(201).json(await Category.create(parsed.data));
} catch (error) {
    if (
    error &&
    typeof error === "object" &&
    "code" in error &&
    error.code === 11000
    ) {
    res.status(409).json({ message: "Category name already exists" });
    return;
    }
    throw error;
}
}

export  const updateCategory = async (
req: Request,
res: Response,
): Promise<void> => {
const parsed = categorySchema.partial().safeParse(req.body);
if (!parsed.success) {
    res.status(400).json({ message: "Invalid category data" });
    return;
}
const category = await Category.findByIdAndUpdate(
    req.params.id,
    parsed.data,
    {
    new: true,
    runValidators: true,
    },
);
if (!category) {
    res.status(404).json({ message: "Category not found" });
    return;
}
res.json(category);
}
export const deleteCategory = async (
req: Request,
res: Response,
): Promise<void> => {
const used = await Food.exists({ category: req.params.id });
if (used) {
    res
    .status(409)
    .json({ message: "Move or delete foods in this category first" });
    return;
}
const category = await Category.findByIdAndDelete(req.params.id);
if (!category) {
    res.status(404).json({ message: "Category not found" });
    return;
}
res.json({ message: "Category deleted" });
}