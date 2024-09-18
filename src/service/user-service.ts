import UserRepository from "../repository/user-repository";
import User, { UserAttribute } from "../models/user";
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

    #verifyToken(token: string){
        try {
            if(!SECRET_KEY){
                throw "JWT Secret key not found, please check it carefully"
            }
            const isVerified = jwt.verify(token, SECRET_KEY);
            return isVerified;
        } catch (error) {
            console.log('Something went wrong inside verifyToken method inside service layer')
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

    isAuthenticated = async(token:string) => {
        try {
            const isVerified = this.#verifyToken(token) as jwtPayload;
            if(!isVerified){
                throw "Token is expired or Invalid token"
            }
            const isUserExist = await this.userService.getUserById(isVerified.id);
            if(!isUserExist) {
                throw "No user found with this id"
            }
            return isVerified
        } catch (error) {
            console.log("Something went wrong inside service layer authenticated method");
            throw error
        }
    }

    getUserById = async(userId: number) => {
        try {
            const isUser = await this.userService.getUserById(userId);
            if(!isUser){
                throw "User not found with this id"
            }
            return isUser;
        } catch (error) {
            console.log("Something went wrong inside service layer getUserById method");
            throw error
        }
    }

    getUserByUsername = async(username: string) => {
        try {
            const isUser = await this.userService.getUserByUsername(username);
            if(!isUser){
                throw "User not found with this username"
            }
            return isUser;
        } catch (error) {
            console.log("Something went wrong inside service layer getUserByUsername method");
            throw error
        }
    }

    deleteUserData = async(userId: number) => {
        try {
            const isUserExist = await this.userService.getUserById(userId);
            if(!isUserExist){
                throw "User not found"
            }
            const response = await this.userService.deleteUserData(userId);
            return response
        } catch (error) {
            console.log("Something went wrong inside service layer deleteUserData method");
            throw error
        }
    } 

    updateUserData = async(userId: number, userData:Partial<UserAttribute>) => {
        try {
            const isUser = await this.userService.getUserById(userId);
            if(!isUser){
                throw "User not found"
            }
            const response = await this.userService.updateUserData(userId, userData);
            return response
        } catch (error) {
            console.log("Something went wrong inside service layer updateUserData method");
            throw error
        }
    }
}

export default UserService