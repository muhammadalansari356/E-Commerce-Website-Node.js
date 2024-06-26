import { fileURLToPath } from 'url'
import path from 'path'
import cloudinary from 'cloudinary';
import dotenv from 'dotenv'
//set directory dirname 
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../../config/.env') })

cloudinary.v2.config({
    api_key:process.env.api_key,
    api_secret:process.env.api_secret,
    cloud_name:process.env.cloud_name,
    secure: true
})

export default cloudinary.v2;