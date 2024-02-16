import { RowDataPacket } from "mysql2";

export default interface IUser extends RowDataPacket {

    //id? : string,
    username : string,
    surname : string,
    lastname : string,
    email : string,
    password : string,
    admin : boolean,
    created_at?: Date
}