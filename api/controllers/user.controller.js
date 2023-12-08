import User from "../models/users.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from "bcryptjs"

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return errorHandler(401, "Invalid User!! Can't Update", next)
    }
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                photoURL: req.body.photo
            }
        }, { new: true });

        const { password, ...userInfo } = updatedUser._doc;
        res.status(200).json({
            success: true,
            userInfo,
            message: "Profile Updated Successfully!!"
        })
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return errorHandler(401, "Invalid User!! Can't Delete", next)
    }
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success: true,
            message: "Your Account Deleted Successfully!!"
        })
    } catch (error) {
        next(error);
    }
}

export const getUserDetails = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return errorHandler(401, "Invalid User!!", next)
        }

        const { password, ...userInfo } = user._doc;
        res.status(200).send({
            success: true,
            userInfo,
            message: "UserDetails Fetched Successfully!!"
        })
    } catch (error) {
        next(error);
    }
}