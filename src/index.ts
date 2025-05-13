import express from 'express'
import cors from 'cors'

const app = express();
const port = process.env.PORT || 8000

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}))
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Server Working")
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
