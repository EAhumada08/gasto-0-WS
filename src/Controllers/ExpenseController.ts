import { Response } from "express";
import { AuthRequest } from "../interfaces/express";
import { ExpensesService } from "../Services/ExpensesService";
import { NewExpenseEntry } from "../interfaces/Expenses";
import { showError } from "../utils/utilFunctions";

export class ExpenseController {
    static async addExpense(req: AuthRequest, res: Response) {
        try {
            const expenseToAdd  = { usuario_id: req.user.id, ...req.body} as NewExpenseEntry;
            const newExpense = await ExpensesService.addExpense(expenseToAdd);

            if(!newExpense) {
                res.status(400).json({ message: "Error al agregar el gasto" });
            } else{ 
                res.status(201).json({ message: "Gasto agregado correctamente", newExpense });
            }
        } catch (error: unknown) {
            const errorMessage = showError(error);

            res.status(400).send(errorMessage);
        }
    }

    static async getExpensesByUserId(req: AuthRequest, res: Response) {
        try {
            const userId = req.user.id;
                const expenses = await ExpensesService.getExpensesByUserId(userId);
            
            if (!expenses || expenses.length === 0) {
                res.status(404).json({ message: "No se encontraron gastos para este usuario" });
            } else {
                res.status(200).json({ message: "Gastos obtenidos correctamente", expenses });
            }
        } catch (error) {
            const errorMessage = showError(error);

            res.status(400).send(errorMessage);
        }
    }
}