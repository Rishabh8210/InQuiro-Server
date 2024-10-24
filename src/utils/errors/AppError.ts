import { StatusCodes } from "http-status-codes";

class AppError extends Error {
    public explanation: string | string[];
    public statusCode: number
    
    constructor(name = 'ServerError', message = 'Something went wrong, Please try again later', explanation = ['Something went wrong, Please try again later'], statusCode = StatusCodes.INTERNAL_SERVER_ERROR){
        super();
        this.name = name
        this.message = message
        this.explanation = explanation
        this.statusCode = statusCode 
    }
}

export default AppError