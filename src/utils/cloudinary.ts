import { v2 as Cloudinary } from 'cloudinary';
import fs from 'fs'
Cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadImageOnCloudinary = async (localFilePath: any) => {
  try {
    if (!localFilePath) return null;
    const response = await Cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto'
    })
    fs.unlinkSync(localFilePath);
    return {
      url: response.secure_url,
      publicId: response.public_id
    };
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }

}
const deleteImageFromCloudinary = async (publicId: string) => {
  try {
    if (!publicId) return null;
    const response = await Cloudinary.uploader.destroy(publicId, {
      resource_type: 'auto'
    })
    return response;
  } catch (error) {
    return null;
  }
}
export { uploadImageOnCloudinary, deleteImageFromCloudinary }
