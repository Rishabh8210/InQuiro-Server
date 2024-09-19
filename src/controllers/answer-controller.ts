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
            console.log("Something went wrong inside AnswerController createUser method");
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                data: {},
                success: false,
                message: 'Not able to create an answer',
                err: error
            })
        }
    }
}

export default AnswerController