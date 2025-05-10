import {z} from "zod";
import { NewExpenseEntry } from "../interfaces/Expenses";

export const ExpenseSchema = z.object({
    gasto_id: z.number(),
    usuario_id: z.string().uuid(),
    descripcion: z.string(),
    monto: z.number().positive(),
    categoria: z.string(),
    fecha: z.string() 
});

export const NewExpenseSchema = ExpenseSchema.omit({ gasto_id: true });

function toNewExpenseEntry(object: unknown): NewExpenseEntry {
    return NewExpenseSchema.parse(object);
}