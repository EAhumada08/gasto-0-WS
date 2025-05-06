import { Response, NextFunction } from "express"
import { AuthServices} from "../Services/Auth.Services"
import { AuthRequest } from "../interfaces/express"

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1] as string

    if (!token) {
        res.status(401).json({ message: 'No autorizado' })
    } else {
        

    try {
        const decoded = AuthServices.verifyToken(token);
        req.user = decoded as any; // Cast to AuthRequest type
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token no valido' })
        console.log('error')
    }
    }
    
}