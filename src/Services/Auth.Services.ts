import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../interfaces/IUsers';
import { toNonSensitiveUserData } from '../utils/userParsers';

export class AuthServices {
    private static readonly JWT_SECRET = process.env.JWT_SECRET || 'default';
    private static readonly JWT_EXPIRATION = '1h';

    public static async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    public static async comparePassword(password: string, hasedPassword: string){
        return bcrypt.compare(password, hasedPassword);
    }

    public static generateToken(user: User): string {
        const nonSensitiveUserData = toNonSensitiveUserData(user);
        
        return jwt.sign(
            nonSensitiveUserData,
            this.JWT_SECRET,
            { expiresIn: this.JWT_EXPIRATION }
        )
    }

    public static verifyToken(token: string) {
        return jwt.verify(token, this.JWT_SECRET);
    }
}