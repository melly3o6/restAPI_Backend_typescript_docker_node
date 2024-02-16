import DB from './DB'
import IRole from './Roles.src/IRole';

export default class RoleMgmt {
    public static roleTable: string = "role"

    public static init(): void {
        DB.init();
        DB.createTableRole();

        RoleMgmt.roleTable = (process.env.DB_ROLE_TABLE ? process.env.DB_ROLE_TABLE : "role");
    }

    public static async getAllRole(): Promise<IRole[]> {
        return new Promise((resolve, reject) => {
            DB.pool.query<IRole[]>(`SELECT * FROM ${RoleMgmt.roleTable}`, (err, res) => {
                if (err) reject(err)
                else resolve(res)
            })
        })
    }

    public static async getRoleById(id: string): Promise<IRole | undefined> {
        return new Promise((resolve, reject) => {
            DB.pool.query<IRole[]>(
                `SELECT * FROM ${RoleMgmt.roleTable} WHERE id = ?`, [id],
                (err, res) => {
                    if(err) reject(err)
                    else resolve(res?.[0])
                }
            )
        })
    }
}