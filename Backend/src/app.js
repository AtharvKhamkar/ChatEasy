import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
    
}))

app.use(express.json({
    limit:"16kb"
}))

app.use(express.urlencoded({
    limit: "16kb",
    extended:true
}))

app.use(express.static("public"))

app.use(cookieParser())

//routes
import userRouter from "./routes/user.routes.js";



app.get("/", (req, res) => {
    return res.send(`Server is running on ${process.env.PORT}`)
})


export { app };
