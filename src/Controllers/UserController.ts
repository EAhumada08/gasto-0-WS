import { Request, Response } from "express";
import { UserServices } from "../Services/User.Services";
import { parseCorreo } from "../utils/userParsers";
import { showError } from "../utils/utilFunctions";

export class UserController {

    public static async getAllUsers(_req: Request, res: Response): Promise<void> {
        try {
            const users = await UserServices.getAllUsers();
            if(!users || users.length === 0) {
                res.status(404).send("No hay usuarios registrados.");
            }
            res.status(200).json(users);
        } catch (error: unknown) {
            const errorMessage = showError(error);
            res.status(400).send(errorMessage);
        }
    }

    public static async getUserByEmail(req: Request, res: Response): Promise<void> {
        try {
            const { correo } = req.body;
            const correoTovalidate = parseCorreo(correo);
            const user = await UserServices.getUserByEmail(correoTovalidate);

            if(!user) {
                res.status(404).send("No se encontro el usuario.");
            }

            res.status(200).json(user);
        } catch(error: unknown) {
            const errorMessage = showError(error);
            
            res.status(400).send(errorMessage);
        }
    }
}