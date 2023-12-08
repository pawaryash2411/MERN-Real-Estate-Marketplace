import Express from "express";
import dotenv from "dotenv"
import Mongoose from "mongoose";
import UserRoute from "./routes/user.route.js"
import AuthRoute from "./routes/auth.route.js"
import ListingRoute from "./routes/list.route.js"
import cookieParser from "cookie-parser";

dotenv.config();

const connectDatabase = async () => {
    try {
        await Mongoose.connect("mongodb://127.0.0.1:27017/RealEstate").then((data) => {
            console.log(`Database connection established on ${data.connection.host}`);
        })
    } catch (error) {
        console.log("Database connection error", error);
    }
}
connectDatabase();

const app = Express();
const port = 2000;

// Middlewares
app.use(Express.json());
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send(`<h1>Hello People</h1>`);
})

app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`)
})

app.use("/api/user", UserRoute);
app.use("/api/auth", AuthRoute);
app.use("/api/listing", ListingRoute);


app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
});