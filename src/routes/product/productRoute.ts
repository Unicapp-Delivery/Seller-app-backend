import { Router } from "express";
const products = Router();
import { createProduct, getProducts } from "../../controllers/products/productController";
import { upload } from "../../middleware/multer";

products.post("/addProduct", upload.array("images", 5), createProduct);
products.get("/getProducts", getProducts);


export default products


