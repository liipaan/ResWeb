import { Router } from "express";
import {
listCategories,
createCategory,
updateCategory,
deleteCategory,
} from "../controllers/categoryController.ts";
import { requireAuth, requireAdmin } from "../middleware/auth.ts";

const router = Router();

router.get("/", listCategories);
router.post("/", requireAuth, requireAdmin, createCategory);
router.patch("/:id", requireAuth, requireAdmin, updateCategory);
router.delete("/:id", requireAuth, requireAdmin, deleteCategory);

export default router;