import { Expense, NewExpenseEntry } from "../interfaces/Expenses";
import { ExpenseModel } from "../Models/ExpenseModel";

export class ExpensesService {
    static async addExpense(expenseToAdd: NewExpenseEntry) {
        return await ExpenseModel.create<Expense>('gastos', expenseToAdd);
    }

    static async getExpensesByUserId(userId: string) {
        return await ExpenseModel.getExpensesByUserId(userId);
    }

}