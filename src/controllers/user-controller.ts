import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from '../models/user'

export const createUser = async(req: Request, res: Response) => {
    try {
        const data = req.body;
        console.log(data);
        const response = await User.create(req.body);
        return res.status(StatusCodes.CREATED).json({
            data: response,
            message: 'User data is created',
            success: true,
            err: {}
        })
    } catch (error:any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            message: "Can't able to create user",
            success: false,
            err: error
        })
    }
}