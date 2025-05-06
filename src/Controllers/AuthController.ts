import { Request, Response } from "express";
import { toNewUserEntry, toNonSensitiveUserData } from "../utils/userParsers";
import { UserServices } from "../Services/User.Services";
import { AuthServices } from "../Services/Auth.Services";
import { showError } from "../utils/utilFunctions";

export class AuthController {
    public static async login(req: Request, res: Response){
        try{
            const { correo, password } = req.body;
            const user = await UserServices.getUserByEmail(correo);
            const isValidPassword = await AuthServices.comparePassword(password, user.password);

            
            if (!user || !isValidPassword){
                res.status(401).json({ message: 'Credenciales incorrectas.' });
            } else {
                const nonSensitiveUserData = toNonSensitiveUserData(user);
                const token = AuthServices.generateToken(user);
            
                res.status(200).json({user: nonSensitiveUserData, token});
            }
        } catch (error: unknown) {
            const errorMessage = showError(error);  
            res.status(400).send(errorMessage);
        }

    }

    public static async register(req: Request, res: Response){
        try{
            const newUserEntry = toNewUserEntry(req.body);
            const existingUser = await UserServices.getUserByEmail(newUserEntry.correo);
            if (existingUser) {
                res.status(400).json({ message: 'El correo ya está registrado.' });
            } else{
                
                const newUser = await UserServices.createUser(newUserEntry);

                res.status(201).json(newUser);
            }
        } catch (error: unknown) {
            const errorMessage = showError(error);

            res.status(400).send(errorMessage);
        }
    }

    public static async validateEmail (req: Request, res: Response){
        try {
            const { correo } = req.body;
            const user = await UserServices.getUserByEmail(correo);
            if (user) {
                res.status(200).json({ message: 'El correo ya está registrado.' });
            } else {
                res.status(200).json({ message: 'El correo está disponible.' });
            }
        } catch (error: unknown) {
            const errorMessage = showError(error);
            res.status(400).send(errorMessage);
        }
    }
}