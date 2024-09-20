import { Request, Response } from 'express'
import AnswerService from "../service/answer-service";
import { AnswerAttributes } from "../models/answer";
import { StatusCodes } from 'http-status-codes'

class AnswerController {
    answerController: AnswerService
    constructor(){
        this.answerController = new AnswerService()
    }

    createAnswer = async(req: Request, res: Response) => {
        try {
            const postId = parseInt(req.query.postId as string) as number;
            const answerData: AnswerAttributes = {
                post_id: postId,
                user_id: req.body.userId,
                content: req.body.content
            };
            const response = await this.answerController.createAnswer(answerData);
            return res.status(StatusCodes.CREATED).json({
                data: response,
                success: true,
                message: 'Successfully create an answer',
                err: {}
            })
        } catch (error) {
            console.log("Something went wrong inside AnswerController createAnswer method");
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                data: {},
                success: false,
                message: 'Not able to create an answer',
                err: error
            })
        }
    }

    updateAnswer = async(req: Request, res: Response) => {
        try {
            const answerId = parseInt(req.params.answerId) as number;
            const answerData:AnswerAttributes = req.body;
            const response = await this.answerController.updateAnswer(answerId, answerData);
            return res.status(StatusCodes.OK).json({
                data: response,
                success: true,
                message: 'Successfully updated answer data',
                err: {}
            })  
        } catch (error) {
            console.log("Something went wrong inside AnswerController updateAnswer method");
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                data: {},
                success: false,
                message: 'Not able to update an answer',
                err: error
            })
        }
    }

    deleteAnswer = async(req: Request, res: Response) => {
        try {
            const answerId = parseInt(req.params.answerId) as number;
            const response = await this.answerController.deleteAnswer(answerId);
            return res.status(StatusCodes.OK).json({
                data: response,
                success: true,
                message: 'Successfully deleted answer data',
                err: {}
            })
        } catch (error) {
            console.log("Something went wrong inside AnswerController deleteAnswer method");
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                data: {},
                success: false,
                message: 'Not able to delete an answer',
                err: error
            })
        }
    }

    getAnswerById = async(req: Request, res: Response) => {
        try {
            const answerId = parseInt(req.params.answerId) as number;
            const response = await this.answerController.getAnswerById(answerId);
            return res.status(StatusCodes.OK).json({
                data: response,
                success: true,
                message: 'Successfully fetched answer data',
                err: {}
            })
        } catch (error) {
            console.log("Something went wrong inside AnswerController deleteAnswer method");
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                data: {},
                success: false,
                message: 'Not able to fetched an answer',
                err: error
            })
        }
    }

    getAllAnswerBySpecificUser = async(req: Request, res: Response) => {
        try {
            const postId = parseInt(req.query.postId as string) as number;
            const userId = parseInt(req.params.userId) as number;
            const response = await this.answerController.getAnswerBySpecificUser(postId, userId);
            return res.status(StatusCodes.OK).json({
                data: response,
                success: true,
                message: 'Successfully fetched answer data by specified user',
                err: {}
            })
        } catch (error) {
            console.log("Something went wrong inside AnswerController getAllAnswerBySpecificUser method");
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                data: {},
                success: false,
                message: 'Not able to fetched answer by specified user',
                err: error
            })
        }
    }

    getAllPostAnswer = async(req: Request, res: Response) => {
        try {
            const postId = parseInt(req.params.postId) as number;
            const response = await this.answerController.getAllPostAnswer(postId);
            return res.status(StatusCodes.OK).json({
                data: response,
                success: true,
                message: 'Successfully fetched all post answers',
                err: {}
            })
        } catch (error) {
            console.log("Something went wrong inside AnswerController getAllPostAnswer method");
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                data: {},
                success: false,
                message: 'Not able to fetched all post answers',
                err: error
            })
        }
    }
}

export default AnswerController