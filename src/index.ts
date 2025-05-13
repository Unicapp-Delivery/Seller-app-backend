import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'

import authRoute from './routes/authRoute';
dotenv.config()
const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: ["*", "http://localhost:3000"],
  credentials: true,
}))
app.get("/", (req, res) => {
  res.send("Server Working")
})
app.use("/api/auth", authRoute)
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port `)
})
