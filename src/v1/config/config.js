import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
dotenvExpand.expand(dotenv.config());

// get data from .env file
export const config = {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000,
    mongo_local_db: process.env.MONGO_LOCAL_DB || '',
    mongo_cluster_db: process.env.MONGO_CLUSTER_DB || '',
};

//** bcrypt */
config.bcrypt_salt_round = process.env.BCRYPT_SALT_ROUND || 10;

//** set locale for language */
config.locale = process.env.LOCALE || 'en';

//** Jwt */
config.jwt_encryption = process.env.JWT_ENCRYPTION || 'secret';
config.jwt_expiration = process.env.JWT_EXPIRATION || '1d';
config.jwt_refresh_expiration = Number(process.env.JWT_REFRESH_ENCRYPTION) || 7;

config.mail_host = process.env.MAIL_HOST || '';
config.mail_port = process.env.MAIL_PORT || '';
config.mail_username = process.env.MAIL_USERNAME || '';
config.mail_password = process.env.MAIL_PASSWORD || '';
config.mail_from_address = process.env.MAIL_FROM_ADDRESS || '';

//* s3 bucket credentials */
config.AWS_SES_ACCESS_KEYID = process.env.AWS_SES_ACCESS_KEYID || '';
config.AWS_SES_SECRET_ACCESS_KEY = process.env.AWS_SES_SECRET_ACCESS_KEY || '';
config.AWS_SES_REGION = process.env.AWS_SES_REGION || '';
config.CLOUDFRONT_BASE_URL = process.env.CLOUDFRONT_BASE_URL || '';
config.AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME || '';
config.AWS_URL = process.env.AWS_URL || '';
config.AWS_USE_PATH_STYLE_ENDPOINT = process.env.AWS_USE_PATH_STYLE_ENDPOINT || '';