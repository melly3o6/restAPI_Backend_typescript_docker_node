import { RowDataPacket } from "mysql2";
import { v4 as uuidv4 } from 'uuid';

export default interface IUser extends RowDataPacket {

    id? : string,
    username : string,
    surname : string,
    firstname : string,
    email : string,
    password : string,
    admin? : boolean,
    created_at?: Date
}

export const generateUUID = (): string => {
    return uuidv4();
};