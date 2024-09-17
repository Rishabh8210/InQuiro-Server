import { DataType, DataTypes, Model } from "sequelize";
import sequelize from "../config/database-config";
import bcrypt from 'bcrypt'
import {SALT} from '../config/server-config'
export interface UserAttribute{
  id: number,
  name:string,
  username: string,
  email: string,
  password: string,
  acc_type: string
}


class User extends Model<UserAttribute> implements UserAttribute {
  public id!: number;
  public name!:string;
  public email!:string;
  public username!:string;
  public password!:string;
  public acc_type!:string
}

User.init(
  {
    id: {
      type: DataTypes.NUMBER,
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
      type: DataTypes.ENUM,
      values: ["Private", "Public"],
      allowNull: false,
      defaultValue: "Public",
    } 
  },
  {
    tableName: "Users",
    sequelize,
    hooks: {
      beforeCreate: async (user: User) => {
        if(user.password && SALT) {
          const SALT_VALUE = parseInt(SALT);
          user.password = await bcrypt.hash(user.password, SALT_VALUE);
        }
      },
      beforeUpdate: async (user: User) => {
        if(user.password && user.changed('password') && SALT) {
          const SALT_VALUE = parseInt(SALT);
          user.password = await bcrypt.hash(user.password, SALT_VALUE)
        }
      }
    }
  }
)

export default User;