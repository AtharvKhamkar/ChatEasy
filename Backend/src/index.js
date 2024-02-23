import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";


dotenv.config({
    path:'/home/mahesh/ChatEasy/.env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 11000, () => {
        console.log(`Server is running on ${process.env.PORT}`)
    })
})
.catch((error) => console.log(`MongoDB connection failed!! ${error}`))



