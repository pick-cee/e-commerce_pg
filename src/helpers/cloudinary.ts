import { v2 as cloudinary } from 'cloudinary'
import 'dotenv/config'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})

const cloudinaryUpload = (file: any) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file)
            .then((result) => {
                resolve(result.secure_url)
            })
            .catch((error: any) => {
                reject(error)
            })
    })
}


export default cloudinaryUpload