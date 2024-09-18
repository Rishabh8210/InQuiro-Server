import { PostAttributes } from "../models/post";
import PostReposiorty from "../repository/post-repository";

class PostService{
    postService: PostReposiorty
    constructor(){
        this.postService = new PostReposiorty
    }
    createPost = async(postData: PostAttributes) => {
        try {
            const response = await this.postService.createPost(postData);
            return response;
        } catch (error) {
            console.log("Something went wrong inside post service layer createPost method")
            throw error
        }
    }

    updatePost = async(postId: number, postData: Partial<PostAttributes>) => {
        try {
            const isPostExist = await this.postService.getPostById(postId);
            if(!isPostExist){
                throw `No post found with this ${postId}`
            }
            const response = await this.postService.updatePost(postId, postData);
            const fetchNewDetails = await this.postService.getPostById(postId);
            return fetchNewDetails;
        } catch (error) {
            console.log("Something went wrong inside post service layer updatePost method")
            throw error
        }
    }

    deletePost = async(postId: number) => {
        try {
            const isPostExist = await this.postService.getPostById(postId);
            if(!isPostExist){
                throw `No post found with this postIf ${postId}`;
            }
            const response = await this.postService.deletePost(postId);
            return response;
        } catch (error) {
            console.log("Something went wrong inside post service layer deletePost method")
            throw error
        }
    }

    getPostById = async(postId: number) => {
        try {
            const isPostExist = await this.postService.getPostById(postId);
            if(!isPostExist){
                throw `No post found with this postId ${postId}`
            }
            return isPostExist;
        } catch (error) {
            console.log("Something went wrong inside post service layer getPostById method")
            throw error
        }
    }

    getAllPost = async(filter: Partial<PostAttributes>) => {
        try {
            const response = await this.postService.getAllPost(filter);
            if(!response){
                throw 'No post found'
            }
            return response;
        } catch (error) {
            console.log("Something went wrong inside post service layer getAllPost method")
            throw error
        }
    }
}

export default PostService