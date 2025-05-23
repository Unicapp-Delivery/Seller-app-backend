import { Request, Response } from 'express';
import { prisma } from '../../config/db';
import { uploadImageOnCloudinary } from '../../utils/cloudinary';
declare module 'express-serve-static-core' {
  interface Request {
    id: string
  }
}
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        sellerId: req.id
      }
    })
    if (!products) {
      res.status(404).json({
        message: "No products found"
      })
      return;
    }
    res.status(200).json({
      message: "Products fetched successfully",
      products
    })


  } catch (error) {
    console.log("eroror", error)
    res.status(500).json({
      message: "Internal server error"
    })
    return;
  }
}

export const createProduct = async (req: Request, res: Response) => {
  try {
    const sellerId = req.id;
    const { productName, description, price, quantity } = req.body;

    if (!productName || !description || !price || !quantity) {
      res.status(400).json({ message: "All fields are required" });
      return
    }

    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      res.status(400).json({ message: "Product image is required" });
      return;
    }

    // Upload each file to Cloudinary and collect the URLs
    const imageUploads = await Promise.all(
      files.map(file => uploadImageOnCloudinary(file.buffer))
    );

    // Create the product first
    const product = await prisma.product.create({
      data: {
        productName,
        description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        sellerId,
      },
    });

    // Create related image entries
    const imageCreateData = imageUploads
      .filter(img => img !== null)
      .map(img => ({
        url: img!.url,
        productId: product.id,
      }));

    await prisma.image.createMany({
      data: imageCreateData,
    });

    res.status(201).json({ message: "Product created", product });
    return
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Something went wrong" });
    return;
  }
};

