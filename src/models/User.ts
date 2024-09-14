import { DataType, DataTypes, Model } from "sequelize";
import sequelize from "../config/database-config";

interface UserAttribute{
  name:string,
  username: string,
  email: string,
  password: string
}


class User extends Model<UserAttribute> implements UserAttribute {
  public name!:string;
  public email!:string;
  public username!:string;
  public password!:string;
}

User.init(
  {
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
  },
  {
    tableName: "Users",
    sequelize
  }
)

export default User;