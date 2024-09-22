import Comment from "../models/comment";
import { CommentAttributes } from "../models/comment";
import { Op } from "sequelize";

class CommentRepository {
    createComment = async(commentData: CommentAttributes) => {
        try {
            const response = await Comment.create(commentData);
            return response;
        } catch (error) {
            console.log("Something went wrong inside Comment repository createComment meethod");
            throw error;
        }
    }

    updateComment = async(commentId: number, commentData: Partial<CommentAttributes>) => {
        try {
            
        } catch (error) {
            
        }
    }

    deleteComment = async(commentId: number) => {
        try {
            const response = await Comment.destroy({
                where: {
                    id: commentId
                }
            })
            return response;
        } catch (error) {
            console.log("Something went wrong inside Comment repository createComment meethod");
            throw error;
        }
    }

    getAllTopLevelComment = async(postType: "Post" | "Answer", postTypeId: number) => {
        try {
            const response = await Comment.findAll({
                where: {
                    commentOn_type: postType,
                    commentOn_id: postTypeId,
                    parentComment_id: null
                },
                include: [{
                    model: Comment,
                    as: 'Replies'
                }]
            })
        } catch (error) {
            console.log("Something went wrong inside Comment repository createComment meethod");
            throw error;
        }
    }
}

export default CommentRepository;