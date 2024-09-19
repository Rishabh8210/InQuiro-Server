import AnswerRepository from '../repository/answer-repository'
import PostReposiorty from '../repository/post-repository';
import UserRepository from '../repository/user-repository';
import { AnswerAttributes } from "../models/answer";

class AnswerService {
    answerService: AnswerRepository
    postService: PostReposiorty
    userService: UserRepository
    constructor(){
        this.answerService = new AnswerRepository();
        this.postService = new PostReposiorty();
        this.userService = new UserRepository()
    }

    createAnswer = async(answerData: AnswerAttributes) =>  {
        try {
            const isPostAvailable = await this.postService.getPostById(answerData.post_id);
            if(!isPostAvailable) {
                throw "No post found"
            }
            const response = await this.answerService.createAnswer(answerData);
            return response;
        } catch (error) {
            console.log("Something went wrong inside Answer Service createAnswer method");
            throw error
        }
    }
    
    updateAnswer = async(answerId: number, answerData: Partial<AnswerAttributes>) => {
        try {
            const response = await this.answerService.updateAnswer(answerId, answerData);
            const updatedResponse = await this.answerService.getAnswerById(answerId);
            return updatedResponse;
        } catch (error) {
            console.log("Something went wrong inside Answer Service updateAnswer method");
            throw error
        }
    }

    deleteAnswer = async(answerId: number) => {
        try {
            const isAnswerExist = await this.answerService.getAnswerById(answerId);
            if(!isAnswerExist) {
                throw `No answer post found using this ${answerId} id`
            }
            const response = await this.answerService.deleteAnswer(answerId);
            return response;
        } catch (error) {
            console.log("Something went wrong inside Answer Service deleteAnswer method");
            throw error
        }
    }

    getAnswerById = async(answerId: number) => {
        try {
            const response = await this.answerService.getAnswerById(answerId);
            return response;
        } catch (error) {
            console.log("Something went wrong inside Answer Service getAnswerById method");
            throw error
        }
    }

    getAnswerBySpecificUser = async(postId: number, userId: number) => {
        try {
            const isUserExist = await this.userService.getUserById(userId);
            if(!isUserExist) {
                throw `No user found with this ${userId} id`
            }
            const isPostAvailable = await this.postService.getPostById(postId);
            if(!isPostAvailable) {
                throw `No post found with this ${postId} id`
            }

            const response = this.answerService.getAllAnswerBySpecificUser(postId, userId);
            return response;
        } catch (error) {
            
        }
    }

    getAllPostAnswer = async(postId: number) => {
        try {
            const isPostAvailable = await this.postService.getPostById(postId);
            if(!isPostAvailable) {
                throw "No post found"
            }
            const response = await this.answerService.getAllPostAnswers(postId);
            return response;
        } catch (error) {
            console.log("Something went wrong inside Answer Service getAnswerById method");
            throw error
        }
    }
}

export default AnswerService;