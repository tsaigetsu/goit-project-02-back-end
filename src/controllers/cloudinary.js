import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY } from '../constants/index.js';
import { env } from '../utils/env.js';

console.log('CLOUD_NAME:', env(CLOUDINARY.CLOUD_NAME));
console.log('API_KEY:', env(CLOUDINARY.API_KEY));
console.log('API_SECRET:', env(CLOUDINARY.API_SECRET));

cloudinary.config({
  cloud_name: env('CLOUD_NAME'),
  api_key: env('API_KEY'),
  api_secret: env('API_SECRET'),
  secure: true,
});

export default cloudinary;
