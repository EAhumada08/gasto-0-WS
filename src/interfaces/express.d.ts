import { Request } from "express";
import { NonSensitiveUserData, User } from "./IUsers";

export interface AuthRequest extends Request {
    user?: NonSensitiveUserData;
}