type UUID = `${string}-${string}-${string}-${string}-${string}`;

//export type Correo = `${string}@${string}.${string}`;

export interface User {
    id: UUID;
    nombre: string;
    edad: number;
    correo: string;
    password: string;
}

export type NewUserEntry = Omit<User, "id">

export type NonSensitiveUserData = Omit<User, "password">;
