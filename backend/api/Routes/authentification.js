import express from "express";
import UserController from "../controller/UserController.js";

const router = express.Router();

router.post("/register", UserController.registerUser);

router.post("/login", UserController.loginUser);

export default router;
