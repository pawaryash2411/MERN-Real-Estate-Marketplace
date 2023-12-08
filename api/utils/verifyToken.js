import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return errorHandler(401, "UnAuthorized access token")
    }
    jwt.verify(token, "123456789", (err, user) => {
        if (err) {
            return errorHandler(403, "Forbidden Access")
        }
        console.log("before", req.user)
        req.user = user;
        console.log(req.user)
        console.log("FFFFFF", user)
        next()
    })
}