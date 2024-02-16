import { createPool, Pool } from 'mysql2';
import dotenv from 'dotenv';

dotenv.config()

export default class DB {
    private static HOST: string | undefined = process.env.DB_HOST;
    private static USER: string | undefined = process.env.DB_USER;
    private static PASSWORD: string | undefined = process.env.DB_PASSWORD;
    private static DATABASE: string | undefined = process.env.DB_DATABASE;
    private static PORT: number | undefined = (process.env.DB_PORT? parseInt(process.env.DB_PORT) : undefined);
    public static pool: Pool;

    public static init(): void {
        try
        {
            DB.pool = createPool({
                host: DB.HOST,
                user: DB.USER,
                password: DB.PASSWORD,
                database: DB.DATABASE,
                port: DB.PORT
            })

            console.debug("MySQL Adapter-Pool created successfully")
        }
        catch (error)
        {
            console.error('[mysql.connectot][init][Error]: ', error);
            throw new Error('failed to initialize pool');
        }
    }

    public static checkPool(): void {
        try
        {
            if (!DB.pool) throw new Error('Pool was not created. Ensure pool is created when running the app.');
        }
        catch (error) {
            console.error('[mysql.connector][Pool][Error]', error)
        }
    }
}