import path from 'node:path';

export const ENV_VARS = {
  PORT: 'PORT',
  MONGODB_USER: 'MONGODB_USER',
  MONGODB_PASSWORD: 'MONGODB_PASSWORD',
  MONGODB_URL: 'MONGODB_URL',
  MONGODB_DB: 'MONGODB_DB',
};

// export const TWO_HOURS = 2 * 60 * 60 * 1000;
export const TWO_HOURS = 2 * 60 * 1000;
export const ONE_DAY = 24 * 60 * 60 * 1000;

export const JWT_SECRET = 'JWT_SECRET';

export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'src', 'temp');

export const UPLOAD_DIR = path.join(process.cwd(), 'src', 'uploads');

export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUD_NAME',
  API_KEY: 'API_KEY',
  API_SECRET: 'API_SECRET',
};

export const ENABLE_CLOUDINARY = 'ENABLE_CLOUDINARY';

export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');
