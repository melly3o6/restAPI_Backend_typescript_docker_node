import express, { Application } from "express";
import IApiEndpoints from "./API.src/IApiEndpoints";
import UserEndpoints from "./Users.src/UserEndpoints"
import EHttpMethod from "./API.src/EHttpMethod";
import UserMgmt from "./UserMgmt";

export default class API {
    
    public static app: Application = express(); 
    public static port: number = 8080;
    private static userEndpoints: Array<IApiEndpoints> = UserEndpoints;
    public static configured: boolean = false;

    private static registerUserEndPoints(): void {
        API.userEndpoints.forEach((userEndpoint) => {
            switch (userEndpoint.method) {
                case EHttpMethod.GET:
                    API.app.get(userEndpoint.url, userEndpoint.handler);
                    break;
                case EHttpMethod.POST:
                    API.app.post(userEndpoint.url, userEndpoint.handler);
                    break;
                case EHttpMethod.PUT:
                    API.app.put(userEndpoint.url, userEndpoint.handler);
                    break;
                case EHttpMethod.DELETE:
                    API.app.delete(userEndpoint.url, userEndpoint.handler);
                    break;
                default:
                    throw `No valid HTTP-Method found for endpoint: ${userEndpoint.url}`;
            }
        })
    }

    public static configure(port: number = 8080): void {
        try
        {
            API.port = port;
            API.app.use(express.json());
            API.app.use(express.urlencoded({ extended: true }));

            UserMgmt.init();

            API.registerUserEndPoints();

            API.configured = true;
        }
        catch (error) 
        {
            console.error(`Error occured: ${error}`);
        }
    }

    public static run(): void {
        if (!API.configured){
            API.configure()
        }

        try {
            API.app.listen(API.port, (): void => {
                console.log(`Connected successfully on port ${API.port}`);
            });
        }
        catch (error)
        {
            console.error(`Error occured: ${error}`);
        }
    }
}