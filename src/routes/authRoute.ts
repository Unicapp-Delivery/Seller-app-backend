import { Router } from "express";
const authRoute = Router();
import { signup } from "../controllers/auth/authControllers";
authRoute.get("/signup", signup);
export default authRoute;
