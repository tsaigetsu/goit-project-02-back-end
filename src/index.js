import { setupServer } from './server.js';
import { initMongoDB } from './db/initMongoConnection.js';
import { createDirIfNowExists } from './utils/createDirlfNotExists.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';

const bootstrap = async () => {
  await initMongoDB();
  await createDirIfNowExists(TEMP_UPLOAD_DIR);
  await createDirIfNowExists(UPLOAD_DIR);
  setupServer();
};

bootstrap();
