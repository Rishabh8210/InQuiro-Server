import CommentRepository from "../repository/comment-repository";
import PostReposiorty from "../repository/post-repository";
import AnswerRepository from "../repository/answer-repository";
import { CommentAttributes } from "../models/comment";

class CommentService {
    commentService: CommentRepository;
    postService: PostReposiorty;
    answerService: AnswerRepository
    constructor() {
        this.commentService = new CommentRepository();
        this.postService = new PostReposiorty();
        this.answerService = new AnswerRepository();
    }

    createComment = async(commentData: CommentAttributes) => {
        try {
            const response = await this.commentService.createComment(commentData);
            return response;
        } catch (error) {
            console.log("Something went wrong inside Service Layer createComment method");
            throw error
        }
    }

    updateComment = async(commentId: number, commentData: Partial<CommentAttributes>) => {
        try {
            // Check that the commented Post is existing or not
            const commentedOnTypeId = commentData.commentOn_id as number;
            if(commentData.commentOn_type == "Post"){
                const isPostExist = await this.postService.getPostById(commentedOnTypeId);
                if(!isPostExist) {
                    throw "No Post found"
                }
            }else{
                const isPostExist = await this.answerService.getAnswerById(commentedOnTypeId);
                if(!isPostExist) {
                    throw "No Post found"
                }
            }
            await this.commentService.updateComment(commentId, commentData);
            const updatedResponse = await this.commentService.getCommentById(commentId);
            return updatedResponse;
        } catch (error) {
            console.log("Something went wrong inside Service Layer updateComment method");
            throw error
        }
    }

    deleteComment = async(commentId: number) => {
        try {
            const response = await this.commentService.deleteComment(commentId);
            if(!response){
                throw `No Comment found with this ${commentId} id`
            }
            return response
        } catch (error) {
            console.log("Something went wrong inside Service Layer deleteComment method");
            throw error
        }
    }

    getCommentById = async(commentId: number) => {
        try {
            const response = await this.commentService.getCommentById(commentId);
            if(!response){
                throw `No Comment found with this ${commentId} id`
            }
            return response
        } catch (error) {
            console.log("Something went wrong inside Service Layer createComment method");
            throw error
        }
    }

    getAllTopLevelComment = async(postType: "Post" | "Answer" , postTypeId: number) => {
        try {
            const response = await this.commentService.getAllTopLevelComment(postType, postTypeId);
            if(!response) {
                throw "No comment found"
            }
            return response;
        } catch (error) {
            console.log("Something went wrong inside Service Layer getAllTopLevelComment method");
            throw error
        }
    }
}

export default CommentService