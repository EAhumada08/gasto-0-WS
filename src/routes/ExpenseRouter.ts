import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { AuthRequest } from "../interfaces/express";

const router = Router();

router.get("/ver_gastos",authMiddleware, (req: AuthRequest , res) => {
    res.status(200).json(req.user);
});

export default router;