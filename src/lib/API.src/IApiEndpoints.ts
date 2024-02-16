import { Request, Response } from "express";
import HttpMethod from "./EHttpMethod";

export default interface IApiEndpoint {
    url: string
    method: HttpMethod
    handler: (req: Request, res: Response) => Promise<Response>
}