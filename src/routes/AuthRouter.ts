import { Router } from "express";
import { AuthController } from "../Controllers/AuthController";
import { BaseModel } from "../Models/BaseModel";
import { config } from "../config";

const router = Router();

BaseModel.initializePool(config);

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);

export default router;