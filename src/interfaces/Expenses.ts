export interface Expense {
    gasto_id: number;
    usuario_id: string;
    descripcion: string;
    monto: number;
    categoria: string;
    fecha: string; 
}

export type NewExpenseEntry = Omit<Expense, 'gasto_id'>;