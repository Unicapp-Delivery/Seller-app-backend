import dotenv from 'dotenv'
dotenv.config();
export const JWT_SECRET = process.env.JWT_SECRET as string
export const SECRET_KEY = process.env.TOTP_SECRET as string


