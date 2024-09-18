import HashtagRepository from "../repository/hashtag-repository";
import { HashtagsAttributes } from "../models/hashtag";
class HashtagService {
    hashtagService: HashtagRepository
    constructor(){
        this.hashtagService = new HashtagRepository();
    }

    createHashtag = async(hashtagData: HashtagsAttributes) => {
        try {
            const response = await this.hashtagService.createHashtag(hashtagData);
            return response;
        } catch (error) {
            console.log("Something went wrong inside hashtag service layer createHashtag methods");
            throw error
        }
    }

    createBulkHashtag = async(bulkHashtagData: HashtagsAttributes[]) => {
        try {
            const response = await this.hashtagService.createBulkHashtag(bulkHashtagData);
            return response
        } catch (error) {
            console.log("Something went wrong inside hashtag service layer createBulkHashtag methods");
            throw error
        }
    }

    getHashtagById = async(hashtagId: number) => {
        try {
            const response = await this.hashtagService.getHashtagById(hashtagId);
            if(!response){
                throw `No hashtag found with ${hashtagId} hashtag id`
            }
            return response;
        } catch (error) {
            console.log("Something went wrong inside hashtag service layer getHashtagById methods");
            throw error
        }
    }

    getAllHashtags = async(hashtagsNames: string[] | undefined) => {
        try {
            const response = await this.hashtagService.getAllHashtags(hashtagsNames);
            if(!response){
                throw `No hashtag found`
            }
            return response;
        } catch (error) {
            console.log("Something went wrong inside hashtag service layer getAllHashtags methods");
            throw error
        }
    }
}

export default HashtagService