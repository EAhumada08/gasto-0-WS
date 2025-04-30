import { Router } from "express";
import { UserController } from "../Controllers/UserController";
import { config } from "../config";
import { UserModel } from "../Models/UserModel";

const router: Router = Router();

UserModel.initializePool(config);

router.get("/", UserController.getAllUsers);
router.post('/', UserController.getUserByEmail);

export default router;