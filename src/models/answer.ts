import { DataTypes, Model } from "sequelize";
import sequelize from '../config/database-config'
import User from "./user";
import Post from "./post";

export interface AnswerAttributes {
    id?: number,
    content: string,
    user_id: number,
    post_id: number
}

class Answer extends Model<AnswerAttributes> implements AnswerAttributes{
    public id!: number;
    public content!: string;
    public user_id!: number;
    public post_id!: number;
}
Answer.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: DataTypes.STRING,
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
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Post,
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    }, {
        tableName: 'Answers',
        sequelize
    }
)
export default Answer