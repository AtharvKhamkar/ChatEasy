import mongoose from "mongoose";
import { DB_Name } from "../constants.js";


const connectDB= async () => {
    try {
        const dbConnectionInstance = await mongoose.connect(`${process.env.MONGO_DB_URI}/${DB_Name}`)
        console.log(`\n MongoDB connected!! DB HOST:${dbConnectionInstance.connection.host}`)
    } catch (error) {
        console.log(`Error while connecting to mongoDB ${error}`)
    }
}

export default connectDB