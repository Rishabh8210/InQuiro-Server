import CommentService from "../service/comment-service";
import { StatusCodes } from 'http-status-codes'
import { Request, Response } from 'express'
import { CommentAttributes } from "../models/comment";
import { CommentPostTypeAttribute } from "../repository/comment-repository";

class CommentController {
    commentController: CommentService
    constructor(){
        this.commentController = new CommentService()
    }

    createComment = async(req: Request, res: Response) => {
        try {
            const commentData: CommentAttributes = req.body;
            const response = await this.commentController.createComment(commentData);
            return res.status(StatusCodes.CREATED).json({
                data: response,
                success: true,
                message: 'Successfully Comment is OK',
                err: {}
            })
        } catch (error) {
            console.log("Somethiong went wrong inside Comment contrtoller createComment method");
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                data: {},
                success: false,
                message: 'Not able to create a comment',
                err: error
            })
        }
    }

    updateComment = async(req: Request, res: Response) => {
        try {
            const commentId = parseInt(req.params.commentId) as number;
            const commentData: Partial<CommentAttributes> = req.body;
            const response = await this.commentController.updateComment(commentId, commentData);
            return res.status(StatusCodes.OK).json({
                data: response,
                success: true,
                message: 'Successfully Comment is updated',
                err: {}
            })
        } catch (error) {
            console.log("Somethiong went wrong inside Comment contrtoller updateComment method");
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                data: {},
                success: false,
                message: 'Not able to update the Comment',
                err: {}
            })
        }
    }

    deleteComment = async(req: Request, res: Response) => {
        try {
            const commentId = parseInt(req.params.commentId) as number;
            const response = await this.commentController.deleteComment(commentId);
            return res.status(StatusCodes.OK).json({
                data: response,
                success: true,
                message: 'Successfully comment is deleted',
                err: {}
            })
        } catch (error) {
            console.log("Somethiong went wrong inside Comment contrtoller deleteComment method");
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                data: {},
                success: false,
                message: 'Not able to delete the comment',
                err: error
            })
        }
    }

    getCommentBtId = async(req: Request, res: Response ) => {
        try {
            const commentId = parseInt(req.params.commentId) as number;
            const response = await this.commentController.getCommentById(commentId);
            return res.status(StatusCodes.OK).json({
                data: response,
                success: true,
                message: `Successfully fetched the comment id -${commentId} details`,
                err: {}
            })
        } catch (error) {
            console.log("Somethiong went wrong inside Comment contrtoller deleteComment method");
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                data: {},
                success: false,
                message: 'Not able to fetched comment details',
                err: error
            })
        }
    }

    getAllTopLevelComments = async(req: Request, res: Response ) => {
        try {
            const commentPostTypeId = parseInt(req.params.postId) as number;
            const commentPostType: CommentPostTypeAttribute = req.body.postType;
            const response = await this.commentController.getAllTopLevelComment(commentPostType, commentPostTypeId);
            return res.status(StatusCodes.OK).json({
                data: response,
                success: true,
                message: 'Successfully fetched top level comments',
                err: {}
            })
        } catch (error) {
            console.log("Somethiong went wrong inside Comment contrtoller deleteComment method");
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                data: {},
                success: false,
                message: 'Not able to fetched top level comments',
                err: error
            })
        }
    }
}

export default CommentController