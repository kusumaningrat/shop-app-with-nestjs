import { Response } from 'express';
import * as bcrypt from 'bcrypt';

interface ResponseData {
    message: string;
    statusCode: number;
    count?: any; 
    data?: any;
}

export const resBuilder = (res: Response, code: number, message: string, extraData?: any, data?: any) => {
    const responseData: ResponseData = { message, statusCode: code };

    if (extraData !== undefined) {
        responseData.count = extraData; // Map count to count in the response
    }

    if (data !== undefined) {
        responseData.data = data; // Map data to data in the response
    }

    res.status(code).json(responseData);
};

export const hashPassword = (password) => {
    const saltArounds: number = 10;

    const salt = bcrypt.genSaltSync(saltArounds);
    const hash = bcrypt.hashSync(password, salt)

    return hash
}