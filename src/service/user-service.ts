import UserRepository from "../repository/user-repository";
import { UserAttribute } from "../models/user";
import { SECRET_KEY } from '../config/server-config'
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"

interface jwtPayload {
    id: number, 
    username: string,
}

class UserService {
    userService: UserRepository
    constructor(){
        this.userService = new UserRepository();
    }

    #createToken(payload: jwtPayload){
        try {
            if(!SECRET_KEY){
                throw "JWT Secret key not found, please check it carefully"
            }
            const response = jwt.sign(payload, SECRET_KEY, {expiresIn: '1d'});
            return response;
        } catch (error) {
            console.log('Something went wrong inside createToken function inside service layer')
            throw error
        }
    }

    #checkPassword(currentPassword:string, hashedPassword: string){
        try{
            const response = bcrypt.compareSync(currentPassword, hashedPassword);
            return response
        } catch(error){
            console.log('Something went wrong inside checkPassword function inside service layer')
            throw error
        }
    }




    createUser = async(userData: UserAttribute) => {
        try {
            const response = await this.userService.createUser(userData);
            return response;
        } catch (error) {
            console.log("Something went wrong inside service layer create function");
            throw error
        }
    }

    siginUser = async(username: string, password: string) => {
        try {
            const isUserExist = await this.userService.getUserByUsername(username);
            if(!isUserExist){
                throw "User not found, Please try again later!";
            }
            const checkPassword = this.#checkPassword(password, isUserExist.password);
            if(!checkPassword){
                throw "Wrong password, Please try again"
            }
            
            const token = this.#createToken({id: isUserExist.id, username});
            return token;
        } catch (error) {
            console.log("Something went wrong inside service layer siginUser method");
            throw error
        }
    }
}

export default UserService