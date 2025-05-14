import { Router } from "express";
import { register, signup, verifyOtp } from "../../controllers/auth/authController";
import { cookieVerify } from "../../middleware/authMiddleware";
const auth = Router();

auth.post('/signup', signup)
auth.post('/verifyOtp', verifyOtp)
auth.post('/register', cookieVerify, register)
export default auth;
