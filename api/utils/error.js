export const errorHandler = (statusCode, message, next) => {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    next(error);
}