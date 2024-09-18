import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database-config'
import User from './user';
import Post from './post';
export interface HashtagsAttributes{
    id?: number,
    name: string
}


class Hashtag extends Model<HashtagsAttributes> implements HashtagsAttributes {
    public id!: number;
    public name!: string

    public addUser!: (user: User | User[]) => Promise<void>;
    public getUsers!: () => Promise<User[]>;

    public addPost!: (post: Post | Post[]) => Promise<void>;
    public getPosts!: () => Promise<Post[]>;
}

Hashtag.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        tableName: 'Hashtags',
        sequelize
    }
)

export default Hashtag