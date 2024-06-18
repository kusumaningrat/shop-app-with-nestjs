import { CustomError } from "./customError"

export const IsEmpty = (obj: any) => {
    if (obj === null || obj === undefined || typeof obj === 'undefined' || obj === '' || obj === 'undefined') {
        return true;
    } else if (Array.isArray(obj) && obj.length === 0) {
        return true;
    } else {
        return false;
    }
}

export const IfNotEmptyThrowError = (responseError, errorMsg: string) => {
    if (responseError !== null && responseError !== undefined) {
        throw new CustomError(errorMsg);
    }
}

export const IfEmptyThrowError = (obj: any, errorMsg: string) => {
    if (IsEmpty(obj)) {
        throw new CustomError(errorMsg);
    }
}