import express from "express";
import { createUser } from "../controllers/userController";

const router = express.Router();

router.route("/register").post(createUser);

export default router;
