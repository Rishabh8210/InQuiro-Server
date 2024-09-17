import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
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