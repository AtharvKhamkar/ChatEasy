import { ApiError } from "../utils/ApiResponse.js";

const testServer = async (req, res) => {
    try {
        console.log("test")
        res.send(`Currently server is on`)
    } catch (error) {
        throw ApiError(400,`Error while starting the server ${error}`)
    }
}

export { testServer };
