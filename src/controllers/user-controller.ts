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

    getUserById = async(req: Request, res: Response) => {
        try {
            const userId = parseInt(req.params.userId) as number;
            const isUser = await this.userController.getUserById(userId)
            return res.status(StatusCodes.OK).json({
                data: isUser,
                message: `Successfully fetched user details with id ${userId}`,
                success: true,
                err: {}
            })
        } catch (error) {
            console.log("Something went wrong inside controller layer getUserById method")
            return res.status(StatusCodes.NOT_FOUND).json({
                data: {},
                message: `Not able to fetch user details`,
                success: false,
                err: error
            })
        }
    }

    getUserByUsername = async(req: Request, res: Response) => {
        try {
            const username = req.query.username as string;
            const isUser = await this.userController.getUserByUsername(username)
            return res.status(StatusCodes.OK).json({
                data: isUser,
                message: `Successfully fetched user details with username ${username}`,
                success: true,
                err: {}
            })
        } catch (error) {
            console.log("Something went wrong inside controller layer getUserByUsername method")
            return res.status(StatusCodes.NOT_FOUND).json({
                data: {},
                message: `Not able to fetch user details`,
                success: false,
                err: error
            })
        }
    }

    deleteUserData = async(req: Request, res: Response) => {
        try {
            const userId = parseInt(req.params.userId) as number;
            const response = await this.userController.deleteUserData(userId);
            return res.status(StatusCodes.OK).json({
                data: response,
                success: true,
                message: `Successfully able to delete ${userId} user data`,
                err: {}
            })
        } catch (error) {
            console.log("Something went wrong inside user controller deleteUserData method");
            return res.status(StatusCodes.OK).json({
                data: {},
                success: false,
                message: `Not able to delete user data`,
                err: error
            })
        }
    }

    updateUserData = async(req: Request, res: Response) => {
        try {
            const userId = parseInt(req.params.userId) as number;
            const userData:Partial<UserAttribute> = req.body;
            const response = await this.userController.updateUserData(userId, userData);
            return res.status(StatusCodes.OK).json({
                data: response,
                success: true,
                message: `Successfully able to update ${userId} user data`,
                err: {}
            })
        } catch (error) {
            console.log("Something went wrong inside userController updateUserData method");
            return res.status(StatusCodes.NOT_FOUND).json({
                data: {},
                success: false,
                message: `Not able to update user data`,
                err: error
            })
        }
    }

    likePost = async(req: Request, res: Response) => {
        try {
            const postId = parseInt(req.query.postId as string) as number;
            const userId:number = req.body.userId;
            const response = await this.userController.likePost(userId, postId);
            return res.status(StatusCodes.OK).json({
                data: response,
                success: true,
                message: 'Successfully liked the post',
                err: {}
            })
        } catch (error) {
            console.log("Something went wrong inside userController LikePost method");
            return res.status(StatusCodes.NOT_FOUND).json({
                data: {},
                success: false,
                message: `Not able to Like the post`,
                err: error
            })
        }
    }
}
export default UserController