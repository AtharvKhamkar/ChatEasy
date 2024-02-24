import { Router } from "express";
import { deleteUser, getAllUsers, getUser, updateUser, } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/get-user").get(verifyJWT, getUser)
router.route("/delete-user").delete(verifyJWT, deleteUser)
router.route("/all-users").get(verifyJWT, getAllUsers)
router.route("/update-user").put(verifyJWT,updateUser)

export default router