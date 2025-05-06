import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { ExpenseController } from "../Controllers/ExpenseController";

const router = Router();

router.post("/agregar_gasto",authMiddleware, ExpenseController.addExpense);

export default router;