import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user?._id).select("-password -refreshToken")

    return res.status(200)
        .json(
            new ApiResponse(
                200,
                user,
                "User fetched successfully"
        )
    )
})

const deleteUser = asyncHandler(async (req, res) => {
    const deleted_User = await User.findByIdAndDelete(req.user?._id)

    return res.status(200)
        .json(
            new ApiResponse(
                200,
                {
                    "deleted_user":deleted_User.username,
                },
                "User deleted successfully"

        )
    )
})

const getAllUsers = asyncHandler(async (req, res) => {
    const user = req.user

    const loggedInUser = user._id

    const allUsers = await User.find({
        _id:{$ne:loggedInUser}
    }).select("-password -refreshToken")

    return res.status(200)
        .json(
            new ApiResponse(
                200,
                allUsers,
                "All users fetched successfully"
        )
    )
})

const updateUser = asyncHandler(async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
            fullName: req.body?.fullName,
            username: req.body?.username,
            gender: req.body?.gender
        },
        {
            new:true
        }
    )

    return res.status(200)
        .json(
            new ApiResponse(
                200,
                updatedUser,
                "User updated successfully"
        )
    )


    

})

export { deleteUser, getAllUsers, getUser, updateUser };

