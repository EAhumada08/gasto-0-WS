import { z } from "zod";
import { UserSchema, UserSchemaWithoutId, UserSchemaWithoutPassword } from "../Schemas/UserSchemas";

type UUID = `${string}-${string}-${string}-${string}-${string}`;

//export type Correo = `${string}@${string}.${string}`;

export interface User {
    id: UUID;
    nombre: string;
    edad: number;
    correo: string;
    password: string;
}

export type IUser = z.infer<typeof UserSchema>;

export type NewUserEntry = z.infer<typeof UserSchemaWithoutId>;

export type NonSensitiveUserData = z.infer<typeof UserSchemaWithoutPassword>;
