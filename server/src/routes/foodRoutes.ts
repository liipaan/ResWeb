import { Router } from "express";
import {
  listFoods,
  getFood,
  createFood,
  updateFood,
  deleteFood,
} from "../controllers/foodController.ts";
import { requireAuth, requireAdmin } from "../middleware/auth.ts";

const router = Router();

router.get("/", listFoods);
router.get("/:id", getFood);
router.post("/", requireAuth, requireAdmin, createFood);
router.patch("/:id", requireAuth, requireAdmin, updateFood);
router.delete("/:id", requireAuth, requireAdmin, deleteFood);

export default router;