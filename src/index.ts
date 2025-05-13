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
const port = process.env.PORT || 8000
app.get("/", (req, res) => {
  res.send("Server Working")
})
app.use("/api/auth", authRoute)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
