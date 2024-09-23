import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/validateToken";

export interface UserData{
    userId: number,
    username: string
}
export interface CustomRequest extends Request{
    headers: {
        authorization?: string,
        userData?: UserData,
        [key:string]:any 
    }
}


export const signinValidator = (req:Request, res: Response, next:NextFunction) => {
    if(!req.body.username){
        return res.status(StatusCodes.NOT_FOUND).json({
            data: {},
            message: "Username can't be empty",
            success: false,
            err: 'Username is missing in the signin request'

        })
    }
    else if(!req.body.password){
        return res.status(StatusCodes.NOT_FOUND).json({
            data: {},
            message: "Password can't be empty",
            success: false,
            err: 'Password is missing in the signin request'
        })
    }
    else if(!req.body.username && !req.body.password){
        return res.status(StatusCodes.NOT_FOUND).json({
            data: {},
            message: "Username and Password can't be empty",
            success: false,
            err: 'Username and password is missing in the signin request'
        })
    }
    next()
}

export const validateAuthorizationHeader = (req: CustomRequest, res: Response, next: NextFunction) => {
    if(!req.headers['authorization']){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            data: {},
            message: 'No token provided',
            status: false,
            err: "Token not found in the request"
        })
    }

    const token = req.headers['authorization'].split(' ')[1];
    if(!token){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            data: {},
            message: 'No token provided',
            status: false,
            err: "Token not found in the request"
        }) 
    }
    const userData = verifyToken(token);
    console.log(userData);
    req.headers['user'] = userData
    next();
}
