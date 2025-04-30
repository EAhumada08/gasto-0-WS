import { ConnectionConfig, Pool, PoolClient, QueryResult, QueryResultRow } from 'pg';


export abstract class BaseModel {
    private static pool: Pool;

    public static initializePool(connectionConfig: ConnectionConfig): void {
        if (!BaseModel.pool) {
            this.pool = new Pool(connectionConfig);
        }
    }

    protected static async getClient(): Promise<PoolClient> {
        return await BaseModel.pool.connect();
    }

    protected static async query<T extends QueryResultRow>(queryText: string, values?: any[]): Promise<QueryResult<T>> {
        const client = await this.getClient();
        try {
          return await client.query<T>(queryText, values);
        } finally {
          client.release();
        }
      }

    public static async getAll<T extends QueryResultRow>(table:string): Promise<T[]>{
        const query = `SELECT * FROM ${table}`;
        const result = await this.query<T>(query);
        
        return result.rows;
    }

    public static async create<T extends QueryResultRow>(table:string, data: T): Promise<T> {
        const columns = Object.keys(data).join(", ");
        const values = Object.values(data);
        const placeholders = values.map((_, index) => `$${index + 1}`).join(", ");

        const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders}) RETURNING *`;

        try{
          const result = await this.query<T>(query, values);

          return result.rows[0];
        } catch (error) {
          console.log("Error creando usuario:", error);
          throw new Error('Error creando usuario');
        }
        
    }

    
}