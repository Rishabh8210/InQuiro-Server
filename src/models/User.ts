import { DataType, DataTypes, Model } from "sequelize";
import sequelize from "../config/database-config";
import bcrypt from 'bcrypt'
import { SALT } from '../config/server-config'
import Hashtag from "./hashtag";
import Like from "./like";

export interface UserAttribute {
    id: number,
    name: string,
    username: string,
    email: string,
    password: string,
    acc_type: string
}


class User extends Model<UserAttribute> implements UserAttribute {
    public id!: number;
    public name!: string;
    public email!: string;
    public username!: string;
    public password!: string;
    public acc_type!: string

    // Custom likePost method for manual User->Post association through Like table
    public async likePost(postId: number) {
        try {
            const response = await Like.create({
                like_type: 'Post',
                like_type_id: postId,
                user_id: this.id
            }) 
            return response; 
        } catch (error) {
            console.log("Something went wrong inside User model likePost method");
            throw error
        }
    }

    // Custom likeComment method for manual User->Post association through Like table
    public async likeComment(commentId: number) {
        try {
            return await Like.create({
                like_type: 'Comment',
                like_type_id: commentId,
                user_id: this.id
            })
        } catch (error) {
            console.log("Something went wrong inside User model likeComment method");
            throw error
        }
    }

    // // Custom likeAnswer method for manual User->Post association through Like table
    public async likeAnswer(answerId: number) {
        try {
            return await Like.create({
                like_type: 'Answer',
                like_type_id: answerId,
                user_id: this.id
            })
        } catch (error) {
            console.log("Something went wrong inside User model likeAnswer method");
            throw error
        }
    }

    // Add custom Sequelize association methods for hashtags
    public addHashtags!: (hashtags: Hashtag[] | Hashtag) => Promise<void>;
    public getHashtags!: () => Promise<Hashtag[]>;

    // Add custom Sequelize association methods for followers-followees
    public addFollowees!: (userData: User[] | User) => Promise<void>;
    public getFollowees!: () => Promise<User[]>;
    public getFollowers!: () => Promise<User[]>;
    public removeFollowee!: (userData: User) => Promise<void>;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        acc_type: {
            type: DataTypes.ENUM("Private", "Public"),
            allowNull: false,
            defaultValue: "Public",
        }
    },
    {
        tableName: "Users",
        sequelize,
        hooks: {
            beforeCreate: async (user: User) => {
                if (user.password && SALT) {
                    const SALT_VALUE = parseInt(SALT);
                    user.password = await bcrypt.hash(user.password, SALT_VALUE);
                }
            },
            beforeUpdate: async (user: User) => {
                if (user.password && user.changed('password') && SALT) {
                    const SALT_VALUE = parseInt(SALT);
                    user.password = await bcrypt.hash(user.password, SALT_VALUE)
                }
            }
        },
    }
)

export default User;