import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/server-config";


export const verifyToken = (token: string) => {
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