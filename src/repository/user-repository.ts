import User from '../models/user'
import { UserAttribute } from '../models/user'
import { StatusCodes } from 'http-status-codes'
class UserRepository{
    createUser = async(user: UserAttribute) => {
        try {
            const response = await User.create(user);
            return response;
        } catch (error) {
            console.log("Something went wrong inside repository layer create method");
            throw error
        }
    }
    getUserById = async(userId: number) => {
        try {
            const response = await User.findByPk(userId);
            return response;
        } catch (error) {
            console.log("Something went wrong inside repository layer get id method");
            throw error
        }
    }

    getUserByUsername = async(username: string) => {
        try {
            const response = await User.findOne({
                where: {
                    username: username
                }
            });
            return response;
        } catch (error) {
            console.log("Something went wrong inside repository layer get username method");
            throw error
        }
    }
}


export default UserRepository