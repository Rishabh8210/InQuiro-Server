import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import UserService from "../service/user-service";
import { UserAttribute } from "../models/user";

class UserController{
    userController: UserService
    constructor(){
        this.userController = new UserService()
    }
    createUser = async(req: Request, res: Response) => {
        try {
            const userData: UserAttribute = req.body
            const response = await this.userController.createUser(userData);
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

    siginUser = async(req: Request, res: Response) => {
        try {
            const userData = req.body;
            const response = await this.userController.siginUser(userData.username, userData.password);
            return res.status(StatusCodes.OK).json({
                data: response,
                message: 'Successfully signed-in', 
                success: true,
                err: {}
            })
        } catch (error: any) {
            console.log("Something went wrong inside controller layer siginUser method")
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                data: {},
                message: 'Not able to signed-in, please check your credentials',
                success: false,
                err: error
            })
        }
    }
}
export default UserController