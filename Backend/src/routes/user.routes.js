import { Router } from "express";
import { testServer } from "../controllers/user.controllers.js";

const router = Router()

router.route("").get(testServer)


export default router