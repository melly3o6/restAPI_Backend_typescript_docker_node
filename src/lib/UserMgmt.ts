import DB from './DB';
import IUser from './Users.src/IUser';
import { ResultSetHeader } from 'mysql2';
import bcrypt from 'bcryptjs';
import {v4 as random} from 'uuid';

export default class UserMgmt {
    public static userTable: string = "users"
    
    public static init(): void {
        DB.init();
        DB.createTableUser();
        

        UserMgmt.userTable = (process.env.DB_USER_TABLE ? process.env.DB_USER_TABLE : "users");
    }

    public static async getAllUser(): Promise<IUser[]> {
        return new Promise((resolve, reject) => {
            DB.pool.query<IUser[]>(`SELECT * FROM ${UserMgmt.userTable}`, (err, res) => {
              if (err) reject(err)
              else resolve(res)  
            })
        })
    }

    public static async getUserById(id: string): Promise<IUser | undefined> {
        return new Promise((resolve, reject) => {
            DB.pool.query<IUser[]>(
                `SELECT * FROM ${UserMgmt.userTable} WHERE id = ?`, [id],
                (err, res) => {
                    if(err) reject(err)
                    else resolve(res?.[0])
                }
            )
        })
        
    }

    public static async getUserByUsername(username: string): Promise<IUser | undefined> {
        return new Promise((resolve, reject) => {
            DB.pool.query<IUser[]>(
                `SELECT * FROM ${UserMgmt.userTable} WHERE username = ?`, 
                [username],
                (err, res) => {
                    if (err) reject(err)
                    else resolve(res?.[0])
                }
            )
        })
    }

    public static async createUser(user: IUser): Promise<IUser | undefined> {
        try {

            let id = random();

            let check_user = await this.getUserById(id);

            while (check_user) {
                id = random();
                check_user = await this.getUserById(id);
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.password, salt);
            console.log(user);

            if (user.password === process.env.DB_PASSWORD) {
                user.roleId = 3;
                console.log("You are admin")
            } else {
                user.roleId = 1;
                console.log("You are not admin")
            }
            
            return new Promise(() => {
                DB.pool.query<ResultSetHeader>(
                    `INSERT INTO ${UserMgmt.userTable} (id, username, surname, firstname, email, password, roleId, created_at)
                     VALUES(?,?,?,?,?,?,?, CURRENT_TIMESTAMP)`,
                     [id, user.username, user.surname, user.firstname, user.email, hashedPassword, user.admin], 
                     console.error
                    );
                }
            )
            
        } catch (error) {
            console.error('An error occured while creating user: ', error);
        }
    }

    public static async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        try {
            const match = await bcrypt.compare(plainPassword, hashedPassword);
            return match;
        } catch (error) {
            console.error('Error comparing passwords:', error);
            return false;
        }
    }

    public static async editUser(user: IUser): Promise<IUser | undefined> {
        return new Promise((resolve, reject) => {
            DB.pool.query<ResultSetHeader>(
                `UPDATE ${UserMgmt.userTable} SET username = ?, surname = ?, firstname = ?, email = ?, password = ? WHERE id = ?`,
                [user.username, user.surname, user.lasname, user.email, user.password, user.id],
                (err) => {
                    if (err) reject(err)
                    else
                        UserMgmt.getUserById(user.id!)
                            .then(resolve)
                            .catch(reject)
                }
            )
        })
    }

    public static deleteUser(id: string): Promise<number> {
        return new Promise((resolve, reject) => {
            DB.pool.query<ResultSetHeader>(
                `DELETE FROM ${UserMgmt.userTable} WHERE id = ?`,
                [id],
                (err, res) => {
                    if (err) reject(err)
                    else resolve(res.affectedRows)
                }
            )
        })
    }
}