import User from "../models/users.model.js"
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from '../utils/error.js'

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10)

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return errorHandler(400, "Email is already in use. Please choose a different email.", next)
        }

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({
            success: true,
            message: "User Account Created Successfully!!"
        })
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const validEmail = await User.findOne({ email })
        if (!validEmail) {
            return errorHandler(404, "User Not Found!!", next)
        }
        const validPassword = bcryptjs.compareSync(password, validEmail.password)
        if (!validPassword) {
            return errorHandler(404, "Invalid Password!!", next)
        }
        const token = jwt.sign({ id: validEmail._id }, "123456789");

        const { password: pass, ...userInfo } = validEmail._doc;

        res.cookie('access_token', token, { httpOnly: true }).status(200)
            .json({ success: true, userInfo, message: "User LoggedIn Successfully!!" })

    } catch (error) {
        next(error);
    }
}

export const googleAuth = async (req, res, next) => {
    const { email, password, photo, name } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            const token = jwt.sign({ id: userExists._id }, "123456789");

            const { password: pass, ...userInfo } = userExists._doc;

            res.cookie('access_token', token, { httpOnly: true }).status(200)
                .json({ success: true, userInfo, message: "User LoggedIn Successfully!!" });
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

            const newUser = new User({ username: name, password: hashedPassword, email, photoURL: photo });
            await newUser.save();

            const token = jwt.sign({ id: newUser._id }, "123456789");
            const { password: pass, ...userInfo } = newUser._doc;

            res.cookie('access_token', token, { httpOnly: true }).status(200)
                .json({ success: true, userInfo, message: "User Account Created Successfully!!" });
        }
    } catch (error) {
        next(error);
    }
};

export const signOut = async (req, res, next) => {
    try {
        res.clearCookie("access_token");
        res.status(200).json({
            success: true,
            message: "Logged Out Successfully!!"
        })
    } catch (error) {
        next(error);
    }
}