import { CustomError } from "./customError"

export const IfNotEmptyThrowError = (responseError, errorMsg: string) => {
    if (responseError !== null && responseError !== undefined) {
        throw new CustomError(errorMsg);
    }
}