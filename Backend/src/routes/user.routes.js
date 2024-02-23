import { Router } from "express";
import { deleteUser, getUser, loginUser, logoutUser, registerUser } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").put(verifyJWT, logoutUser)
router.route("/get-user").get(verifyJWT, getUser)
router.route("/delete-user").delete(verifyJWT,deleteUser)


export default router