export interface Config {
  user: string
  password: string
  host: string
  port: number
  database: string
}

export const config: Config = {
  user: 'app_gasto0',
  password: 'gasto0123',
  host: '192.168.0.5',
  port: 5432,
  database: 'gasto0'
}
