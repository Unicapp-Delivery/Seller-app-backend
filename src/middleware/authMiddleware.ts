import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../config/config";
import jwt, { JwtPayload } from "jsonwebtoken";
declare module "express-serve-static-core" {
  interface Request {
    id: string;
  }
}
export const cookieVerify = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET as string) as JwtPayload;
    if (!decoded) {
      res.status(401).json({ message: "Unauthorized" });
      return
    }
    req.id = decoded.user.id
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ message: "Unauthorized" });
    return
  }
}
