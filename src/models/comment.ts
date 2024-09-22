import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database-config'
import User from './user';

export interface CommentAttributes{
    id?: number,
    content: string,
    commentOn_type: string,
    commentOn_id: string,
    user_id: number,
    parentComment_id?: number | null
}

class Comment extends Model<CommentAttributes> implements CommentAttributes {
    public id!: number;
    public content!: string;
    public commentOn_type!: string;
    public commentOn_id!: string;
    public user_id!: number;
    public parentComment_id?: number | null;
}

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    commentOn_type: {
        type: DataTypes.ENUM("Post", "Comment", "Answer"),
        allowNull: false
    },
    commentOn_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    parentComment_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Comment,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, {
    tableName: 'Comments',
    sequelize,
    paranoid: true,  // Enables soft deletes with deletedAt
    
    // improve query performance, especially when filtering or querying by commentOn_type, commentOn_id, user_id, or parentComment_id
    indexes: [
        {
            fields: ['commentOn_type', 'commentOn_id'],
        },
        {
            fields: ['user_id'],
        },
        {
            fields: ['parentComment_id'],
        },
    ]
})

export default Comment;