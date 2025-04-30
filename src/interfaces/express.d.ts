import { Request } from "express";
import { User } from "./IUsers";

export interface AuthRequest extends Request {
    user?:any;
}