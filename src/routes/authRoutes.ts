import express from "express";
import { login } from "../controllers/loginController";
import { validateOtp } from "../controllers/otpController";
import { getUserInfo } from "../controllers/userController";

const router = express.Router();

router.post("/login", login);
router.post("/validate-otp", validateOtp);
router.get("/user-info", getUserInfo);

export default router;
