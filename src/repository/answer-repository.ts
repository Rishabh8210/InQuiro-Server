import Answer from "../models/answer";
import { AnswerAttributes } from "../models/answer";

class AnswerRepository {
    createAnswer = async(answerData: AnswerAttributes) => {
        try {
            const response = await Answer.create(answerData);
            return response;
        } catch (error) {
            console.log("Something went wrong inside Answer Repository createAnswer method");
            throw error
        }
    }

    updateAnswer = async(answerId: number, answerData: Partial<AnswerAttributes>) => {
        try {
            const response = await Answer.update(answerData, {
                where: {
                    id: answerId
                }
            })
            return true;
        } catch (error) {
            console.log("Something went wrong inside Answer Repository updateAnswer method");
            throw error
        }
    }

    deleteAnswer = async(answerId: number) => {
        try {
            const response = await Answer.destroy({
                where: {
                    id: answerId
                }
            })
            return response;
        } catch (error) {
            console.log("Something went wrong inside Answer Repository deleteAnswer method");
            throw error
        }
    }

    getAnswerById = async(answerId: number) => {
        try {
            const response = await Answer.findByPk(answerId);
            return response;
        } catch (error) {
            console.log("Something went wrong inside Answer Repository getAnswerById method");
            throw error
        }
    }

    getAllAnswerBySpecificUser = async(postId: number, userId: number) => {
        try {
            const response = await Answer.findAll({
                where: {
                    post_id: postId,
                    user_id: userId
                }
            });
            return response;
        } catch (error) {
            console.log("Something went wrong inside Answer Repository getAllAnswerBySpecificUser method");
            throw error
        }
    }

    getAllPostAnswers = async(postId: number) => {
        try {
            const responses = await Answer.findAll({
                where: {
                    post_id: postId
                }
            });
            return responses;
        } catch(error) {
            console.log("Something went wrong inside Answer Repository getAllPostAnswers method");
            throw error
        }
    }
}

export default AnswerRepository;