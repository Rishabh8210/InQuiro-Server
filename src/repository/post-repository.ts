import Post from "../models/post";
import { PostAttributes } from "../models/post";

class PostReposiorty {
    #createFilter(filterData: Partial<PostAttributes>){
        let filter = {}

        return filter
    }
    createPost = async(postData: PostAttributes) => {
        try {
            const response = await Post.create(postData);
            return response
        } catch (error) {
            console.log("Something went wrong inside Post repoitory layer createPost method");
            throw error
        }
    }

    updatePost = async(postId: number, postData:Partial<PostAttributes>) => {
        try {
            const response = await Post.update(postData, {
                where: {
                    id: postId
                }
            })
            return response;
        } catch (error) {
            console.log("Something went wrong inside Post repoitory layer updatePost method");
            throw error
        }
    }

    deletePost = async(postId: number) => {
        try {
            const response = await Post.destroy({
                where: {
                    id: postId
                }
            })
            return response;
        } catch (error) {
            console.log("Something went wrong inside Post repoitory layer deletePost method");
            throw error
        }
    }

    getPostById = async(postId: number) => {
        try {
            const response = await Post.findByPk(postId);
            return response;
        } catch (error) {
            console.log("Something went wrong inside Post repoitory layer createPost method");
            throw error
        }
    }

    getAllPost = async(filterData: Partial<PostAttributes>) => {
        try {
            const filter = this.#createFilter(filterData);
            const response = await Post.findAll({
                where: filter
            });
            return response
        } catch (error) {
            console.log("Something went wrong inside Post repository getAllPost")
            throw error
        }
    }
}

export default PostReposiorty