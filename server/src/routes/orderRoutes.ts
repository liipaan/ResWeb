import { Router } from "express";
import { createOrder, myOrders } from "../controllers/orderController.ts";
import { requireAuth } from "../middleware/auth.ts";

const router = Router();

router.post("/", requireAuth, createOrder);
router.get("/mine", requireAuth, myOrders);

export default router;