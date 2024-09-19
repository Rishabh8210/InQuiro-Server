import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database-config'
import User from './user';
import Hashtag from './hashtag';
import Like from './like';

export interface PostAttributes{
    id: number,
    post_type: string,
    post_content: string,
    user_id: number
}

class Post extends Model<PostAttributes> implements PostAttributes{
    public id!:number;
    public post_type!:string;
    public post_content!:string;
    public user_id!:number

    // Custom getPostLikes method for manual User->Post association through Like table
    public async getPostLikes(){
        try {
            return await Like.findAll({
                where: {
                    like_type: 'Post',
                    like_type_id: this.id
                }
            })
        } catch (error) {
            console.log("Something went wrong inside Post model getPostLikes method");
        }
    }
    // Add custom Sequelize association methods
    public addHashtags!: (hashtags: Hashtag[] | Hashtag) => Promise<void>;
    public getHashtags!: () => Promise<Hashtag[]>;
}
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        post_type: {
            type: DataTypes.ENUM('Question', 'Thoughts'),
            defaultValue: "Thoughts",
            allowNull: false
        },
        post_content: {
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
        }
    }, 
    {
        tableName: 'Posts',
        sequelize,
    }
)

export default Post