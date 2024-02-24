import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const sendMessage = asyncHandler(async (req, res) => {
    //get receiversId through req.params
    //get sender id through verifyJWT
    //message from req.body
    //check for existing conversation in the database
    //if not conversation create conversation object
    //create message object
    //push message objectId into conversation messages array
    //add messageId into messages array in conversation object

    const { message } = req.body
    const  receiverId  = req.user._id
    const { senderId } = req?.params

    console.log(receiverId)
    console.log(senderId)

    const conversation = await Conversation.findOne({
        participants:{ $all:[senderId,receiverId]}
    })

    if (!conversation) {
        const createdConversation = await Conversation.create({
            participants:[senderId,receiverId]
        })
        const messageObject = await Message.create({
            senderId,
            receiverId,
            message
        })

        createdConversation.messages.push(messageObject._id)
        await createdConversation.save()

        return res.status(200)
            .json(
                new ApiResponse(
                    200,
                    messageObject,
                    "Message Send Successfully"
            )
        )

    } else {
        const messageObject = await Message.create({
            senderId,
            receiverId,
            message
        })

        conversation.messages.push(messageObject._id)
        await conversation.save()

        //socket.io functionality will add


        return res.status(200)
            .json(
                new ApiResponse(
                    200,
                    messageObject,
                    "Message Send Successfully"
            )
        )
    }

})

const getMessages = asyncHandler(async (req, res) => {
    //get senderId through params
    //get recieversId through req.user
    //match senderId and recieverId in conversation
    //If match return the messages array

    const { Id } = req.params
    const  receiverId  = req.user._id

    console.log(Id)
    console.log(receiverId)
    
    const conversation = await Conversation.findOne({
        participants: {
            $all: [Id, receiverId]
        }
    }).populate("participants", { username: 1 })
    .populate("messages",{message:1})


    console.log(conversation)

    return res.status(200)
        .json(
            new ApiResponse(
                200,
                conversation,
                "Conversation fetched successfully"
        )
    )
})

export { getMessages, sendMessage };

