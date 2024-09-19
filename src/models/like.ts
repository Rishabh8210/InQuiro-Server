import { DataTypes, Model} from 'sequelize';
import sequelize from '../config/database-config'
import User from './user';

export interface LikeAttributes{
    id?: number,
    like_type: string,
    like_type_id: number,
    user_id: number
}

class Like extends Model<LikeAttributes> implements LikeAttributes{
    public id!: number;
    public like_type!: string;
    public like_type_id!: number;
    public user_id!: number;

    public addUser!: (user: User | User[]) => Promise<void>;
    public getUsers!: () => Promise<User[]>;
}

Like.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    like_type: {
        type: DataTypes.ENUM("Answer", "Comment", "Post"),
        allowNull: false
    },
    like_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
}, {
    tableName: 'Likes',
    sequelize
})

export default Like