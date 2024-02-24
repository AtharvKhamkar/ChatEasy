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
import authRouter from "./routes/auth.routes.js";
import messageRouter from "./routes/message.routes.js";
import userRouter from "./routes/user.routes.js";

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/message", messageRouter)
app.use("/api/v1/user",userRouter)

app.get("/", (req, res) => {
    return res.send(`Server is running on ${process.env.PORT}`)
})


export { app };
