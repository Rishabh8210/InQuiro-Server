import User from '../models/user'
import { UserAttribute } from '../models/user'

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

    getUserByEmail = async(email: string) => {
        try {
            const response = await User.findOne({
                where: {
                    email: email
                }
            });
            return response;
        } catch (error) {
            console.log("Something went wrong inside repository layer get username method");
            throw error
        }
    }

    updateUserData = async(userId:number, userData: Partial<UserAttribute>) => {
        try {
            const response = await User.update(userData, {
                where: {
                    id: userId
                }
            });
            const getUpdatedData = await User.findByPk(userId);
            return getUpdatedData;
        } catch (error) {
            console.log("Something went wrong inside repository layer update method");
            throw error;
        }
    }

    deleteUserData = async(userId: number) => {
        try {
            const response = await User.destroy({
                where: {
                    id: userId
                }
            })
        } catch (error) {
            console.log("Something went wrong inside repository layer delete method");
            throw error;
        }
    }
}


export default UserRepository