import PostService from '../service/post-service'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { PostAttributes } from '../models/post'

class PostController{
    postController: PostService
    constructor(){
        this.postController = new PostService()
    }

    createPost = async(req: Request, res: Response) => {
        try {
            const postData:PostAttributes = req.body;
            const response = await this.postController.createPost(postData);
            return res.status(StatusCodes.CREATED).json({
                data: response,
                success: true,
                message: 'Successfully able to create post',
                err: {}
            })
        } catch (error) {
            console.log("Something went wrong inside post controller create post method")
            return res.status(StatusCodes.NOT_FOUND).json({
                data: {},
                success: false,
                message: 'Not able to create post',
                err: error
            })
        }
    }

    updatePost = async(req: Request, res: Response) => {
        try {
            const postId = parseInt(req.params.postId) as number;
            const updateData: Partial<PostAttributes> = req.body;
            const response = await this.postController.updatePost(postId, updateData);
            return res.status(StatusCodes.OK).json({
                data: response,
                message: `Successfully updated ${postId} data`,
                success: true,
                err: {}
            })
        } catch (error) {
            return res.status(StatusCodes.NOT_FOUND).json({
                data: {},
                message: 'Not able to update post data',
                success: false,
                err: error
            })
        }
    }

    deletePost = async(req: Request, res: Response) => {
        try {
            const postId = parseInt(req.params.postId) as number;
            const response = await this.postController.deletePost(postId);
            return res.status(StatusCodes.OK).json({
                data: response,
                message: `Successfully able to delete ${postId} data`,
                success: true,
                err: {}
            })
        } catch (error) {
            return res.status(StatusCodes.NOT_FOUND).json({
                data: {},
                message: 'Not able to delete post data',
                success: false,
                err: error
            })
        }
    }
    
    getPostById = async(req: Request, res: Response) => {
        try {
            const postId = parseInt(req.params.postId) as number;
            const response = await this.postController.getPostById(postId);
            return res.status(StatusCodes.OK).json({
                data: response,
                message: `Successfully fetched ${postId} details`,
                success: true,
                err: {}
            })
        } catch (error) {
            return res.status(StatusCodes.NOT_FOUND).json({
                data: {},
                message: 'Not able to fetch post details',
                success: false,
                err: error
            })
        }
    }

    getAllPostByFilter = async(req: Request, res: Response) => {
        try {
            const filterData:Partial<PostAttributes> = req.query;
            const response = await this.postController.getAllPost(filterData);
            return res.status(StatusCodes.OK).json({
                data: response,
                message: 'Successfully fetched all posts',
                success: true,
                err: {}
            })
        } catch (error) {
            return res.status(StatusCodes.NOT_FOUND).json({
                data: {},
                message: 'Not able to fetched posts',
                success: false,
                err: error
            })
        }
    }
}


export default PostController