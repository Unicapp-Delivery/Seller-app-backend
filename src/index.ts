import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import auth from './routes/auth/route';
import products from './routes/product/productRoute';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("Server listening")
})
app.use("/api/v1/auth/", auth)
app.use('/api/v1/products/', products)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
