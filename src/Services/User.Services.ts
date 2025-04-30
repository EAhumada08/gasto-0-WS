import { NewUserEntry, User } from "../interfaces/IUsers";
import { randomUUID } from "crypto";
import { UserModel } from "../Models/UserModel";
import { AuthServices } from "./Auth.Services";

export class UserServices {
    public static async getAllUsers():Promise<User[]> {
        const table = "usuarios";
        return UserModel.getAll<User>(table);
    }

    public static async createUser(dataUser: NewUserEntry): Promise<User> {
        const id = randomUUID();
        const {nombre, edad, correo, password } = dataUser;
        const hashedPassword = await AuthServices.hashPassword(password);

        const values = {id, nombre, edad, correo, password: hashedPassword } as User;
        const table = "usuarios";
        
        return UserModel.create<User>(table, values);
    }

    public static async getUserByEmail(correo: string): Promise<User>{
        return await UserModel.getByEmail(correo);
    }
}