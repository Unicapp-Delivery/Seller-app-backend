import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoute from './routes/authRoute';
const app = express();
app.use(cors({
  credentials: true,
}))
app.use(express.json())
app.use(cookieParser())
app.get("/", (req, res) => {
  res.send("Server Working")
})
app.use("/api/auth", authRoute)
app.listen(8000, () => {
  console.log(`Server is running on port 8000`)
})
