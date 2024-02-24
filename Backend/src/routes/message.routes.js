import { Router } from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/send/:senderId").post(verifyJWT, sendMessage)
router.route("/conversation/:Id").get(verifyJWT,getMessages)

export default router