import { HashtagsAttributes } from "../models/hashtag";
import { PostAttributes } from "../models/post";
import PostReposiorty from "../repository/post-repository";
import HashtagService from "./hashtag-service";
import UserService from "./user-service";


class PostService{
    postService: PostReposiorty
    hashtagService: HashtagService
    userService: UserService
    constructor(){
        this.postService = new PostReposiorty()
        this.hashtagService = new HashtagService()
        this.userService = new UserService()
    }
    createPost = async(postData: PostAttributes) => {
        try {
            const response = await this.postService.createPost(postData);
            const hashtags: string[] | null = postData.post_content.match(/#[a-zA-Z0-9_]+/g) as string[];
            if(hashtags){
                let filterHashTags: string[] = [];
                const getAllHashtags = await this.hashtagService.getAllHashtags(undefined);
                
                if(getAllHashtags.length === 0){
                    filterHashTags = hashtags
                } else{
                    // Filter distinct hashtags
                    for(let hashtag of hashtags){
                        let flag = false
                        for(let data of getAllHashtags){
                            if(data.dataValues.name === hashtag.substring(1)){
                                flag = true;
                                break;
                            }
                        }
                        if(!flag){
                            filterHashTags.push(hashtag);
                        }
                    }
                }
            
                // convert array of string to a hashtag model object
                const hashtagObjects:HashtagsAttributes[] = filterHashTags.map((hashtag) => ({name: hashtag.substring(1)}))
                
                const saveHashtags = await this.hashtagService.createBulkHashtag(hashtagObjects)
                
                const post = await this.getPostById(response.id);
                if(post){
                    const hashtagsNames = hashtagObjects.map(h => h.name)
                    const foundHashtags = await this.hashtagService.getAllHashtags(hashtagsNames)
                    
                    await post.addHashtags(foundHashtags)
                }
            }
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