import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const generateAccessTokenRefreshToken = async function (userId) {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })
        return {accessToken,refreshToken}
    } catch (error) {
        throw  new ApiError(400,"Error while generating Tokens")
    }
}


const registerUser = asyncHandler(async (req, res) => {
    const { fullName, username, password, gender } = req?.body;

    const checkUser = await User.findOne({ username })
    if (checkUser) {
        throw new ApiError(400, "User has already registered")
    }

    const maleAvatar = `https://avatar.iran.liara.run/public/boy?username=${username}`
    const femaleAvatar = `https://avatar.iran.liara.run/public/girl?username=${username}`

    const user = await User.create({
        fullName,
        username,
        password,
        gender,
        profilePicture: gender == "male" ? maleAvatar : femaleAvatar
    })

    const fetchedUser = await User.findById(user?._id).select("-password")
    if (!fetchedUser) {
        throw new ApiError(400,"Error while registering the user")
    }

    return res.status(200)
        .json(
            new ApiResponse(
                200,
                fetchedUser,
                "User fetched successfully"
        )
    )
})

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req?.body;
    if (!username || !password) {
        throw new ApiResponse(400,"username and  password  is required")
    }

    const checkUser = await User.findOne({ username })
    if (!checkUser) {
        throw new ApiResponse(400,"User is not registered please register first")
    }

    const checkPassword = await checkUser.isPasswordCorrect(password)
    if (!checkPassword) {
        throw new ApiError(400,"Password is incorrect")
    }

    const { accessToken, refreshToken } = await generateAccessTokenRefreshToken(checkUser._id)
   
    const loggedInUser = await User.findById(checkUser._id).select("-password -refreshToken")
    
    const options = {
        httpOnly: true,
        secure:true
    }

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                   user: loggedInUser,accessToken,refreshToken
                },
                "User loggedIn successfully"
        )
    )
})

const logoutUser = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req?.user,
        {
            $set: {
                refreshToken:1
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure:true
    }

    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken",options)
        .json(
            new ApiResponse(
                200,
                user,
                "User logout successfully"
        )
    )
})


export { loginUser, logoutUser, registerUser };

