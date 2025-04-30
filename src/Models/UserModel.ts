import { User } from "../interfaces/IUsers";
import { BaseModel } from "./BaseModel";

export class UserModel extends BaseModel {
    public static async getByEmail(email: string): Promise<User>{
        const query = 'SELECT * FROM usuarios WHERE correo = $1';
        const values = [email];
        const result = await this.query<User>(query, values);

        return result.rows[0];
    }
}