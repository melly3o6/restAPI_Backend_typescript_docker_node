import { Request, Response } from 'express';
import EHttpMethod from '../API.src/EHttpMethod';
import IApiEndpoint from '../API.src/IApiEndpoints';
import IUser from './IUser';
import UserMgmt from '../UserMgmt';
import { StatusCodes } from 'http-status-codes';
//import bodyParser from 'body-parser';
//import { stringify } from 'uuid';

const UserEndpoints: Array<IApiEndpoint> = [
    {
        url: "/",
        method: EHttpMethod.GET,
        handler: async function(req: Request, res: Response): Promise<Response> {
            return res.status(StatusCodes.OK).send({
                message: process.env.WELCOME_MESSAGE
            });
        }
    },
    {
        url: "/api/user",
        method: EHttpMethod.GET,
        handler: async function(req: Request, res: Response): Promise<Response> {
            try
            {
                let user: IUser | IUser[] | undefined

                if (req.query.id && `${req.query.id}` !== "") {
                    user = await UserMgmt.getUserById(`${req.query.id}`);
                }
                else if (req.query.username && `${req.query.username}` !== "") {
                    user = await UserMgmt.getUserByUsername(`${req.query.username}`);
                }
                else {
                    user = await UserMgmt.getAllUser();
                }

                return res.status(StatusCodes.OK).send(JSON.parse(JSON.stringify(user)));
            } 
            catch (error) 
            {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
                    message: `Internal Server Error: ${error}`,
                });
            }
        }
    },
    {
        url: "/api/register",
        method: EHttpMethod.POST,
        handler: async function(req: Request, res: Response): Promise<Response> {
            try
            {
                if (
                    req.body.username != undefined
                    && req.body.surname != undefined
                    && req.body.firstname != undefined
                    && req.body.email != undefined
                    && req.body.password != undefined
                )
                {
                    const user: IUser = {
                        constructor: {name: "RowDataPacket"},

                        username: `${req.body.username}`,
                        surname: `${req.body.surname}`,
                        firstname: `${req.body.firstname}`,
                        email: `${req.body.email}`,
                        password: `${req.body.password}`
                    }

                    UserMgmt.createUser(user);

                    return res.status(StatusCodes.OK).send({
                        message: `Created User: ${user.username}`
                    });
                }
                else {
                    return res.status(StatusCodes.BAD_REQUEST).send({
                        message: `Insufficent Data for creating user.`,
                    });
                }
            }
            catch (error)
            {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
                    message: `Internal Server Error: ${error}`,
                });
            }
        }
    }
]

export default UserEndpoints;
