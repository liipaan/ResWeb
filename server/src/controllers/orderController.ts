import type { Response } from "express";
import { z } from "zod";
import { Order } from "../models/Order.ts";
import { Food } from "../models/Food.ts";
import type { AuthRequest } from "../middleware/auth.ts";

const orderSchema = z.object({
items: z
    .array(
    z.object({
        foodId: z.string().min(1),
        quantity: z.number().int().min(1).max(50),
    }),
    )
    .min(1)
    .max(50),
deliveryAddress: z.string().trim().min(5).max(300),
});

export const createOrder = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    const parsed = orderSchema.safeParse(req.body);

if (!parsed.success) {
    res
    .status(400)
    .json({ message: "Invalid order data", errors: parsed.error.flatten() });
    return;
}

const userId = req.userId;
if (!userId) {
    res.status(401).json({ message: "Authentication required" });
    return;
}

const ids = parsed.data.items.map((item) => item.foodId);
const foods = await Food.find({
    _id: { $in: ids },
    available: true,
});

const foodMap = new Map(foods.map((food) => [food.id, food]));
const orderItems = [];

for (const item of parsed.data.items) {
    const food = foodMap.get(item.foodId);

    if (!food) {
    res
        .status(400)
        .json({ message: `Food not found or unavailable: ${item.foodId}` });
    return;
    }

    orderItems.push({
    food: food._id,
    quantity: item.quantity,
    priceAtOrder: food.price,
    nameAtOrder: food.name,
    });
}

const total = orderItems.reduce(
    (sum, item) => sum + item.priceAtOrder * item.quantity,
    0,
);

const order = await Order.create({
    user: userId,
    items: orderItems,
    total,
    deliveryAddress: parsed.data.deliveryAddress,
});

res.status(201).json(order);
}

export const myOrders = async (req: AuthRequest, res: Response): Promise<void> => {
if (!req.userId) {
    res.status(401).json({ message: "Authentication required" });
    return;
}

const orders = await Order.find({ user: req.userId })
    .populate("items.food", "name imageUrl")
    .sort({ createdAt: -1 });

res.json(orders);
}