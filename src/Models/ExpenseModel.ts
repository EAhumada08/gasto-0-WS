import { BaseModel } from "./BaseModel";

export class ExpenseModel extends BaseModel{
    public static async getExpensesByUserId(userId: string) {
        try{
            const query = 'SELECT descripcion, monto, categoria, fecha FROM gastos WHERE usuario_id = $1';
            const values = [userId];
            const result = await this.query(query, values);

            return result.rows;
        } catch (error) {
            throw new Error("Error al obtener los gastos del usuario");
        }
    }
}