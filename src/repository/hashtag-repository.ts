import Hashtag from "../models/hashtag";
import { HashtagsAttributes } from "../models/hashtag";

class HashtagRepository {

    createHashtag = async(hashtagData: HashtagsAttributes) => {
        try {
            const response = await Hashtag.create(hashtagData);
            return response
        } catch (error) {
            console.log("Something went wrong inside hashtag repository createHashtag method");
            throw error
        }
    }

    createBulkHashtag = async(bulkHashtagData: HashtagsAttributes[]) => {
        try {
            const response = await Hashtag.bulkCreate(bulkHashtagData);
            return response
        } catch (error) {
            console.log("Something went wrong inside hashtag repository createBulkHashtag method");
            throw error
        }
    }

    getHashtagById = async(hashId: number) => {
        try {
            const response = await Hashtag.findByPk(hashId);
            return response;
        } catch (error) {
            console.log("Something went wrong inside hashtag repository getHashedById method");
            throw error
        }
    }

    getAllHashtags = async(hashtagsNames: string[] | undefined ) => {
        try {
            if(!hashtagsNames){
                const response = await Hashtag.findAll();
                return response;
            }
            const response = await Hashtag.findAll({
                where: {
                    name: hashtagsNames
                }
            });
            return response;
        } catch (error) {
            console.log("Something went wrong inside hashtag repository getAllHashtags method");
            throw error
        }
    }
}

export default HashtagRepository;