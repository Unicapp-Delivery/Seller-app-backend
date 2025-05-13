import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app = express();
const port = process.env.PORT || 8000
app.use(cors({
  credentials: true,
}))
app.use(express.json())
app.use(cookieParser())
app.get("/", (req, res) => {
  res.send("Server Working")
})
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
