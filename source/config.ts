import * as dotenv from 'dotenv';
dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const bot_token = process.env.BOT_TOKEN || '';
const port = process.env.PORT || 5000;
const secret_token = process.env.SECRET_TOKEN || '';
const secret_key = process.env.CLICK_SECRET_KEY || '';
const service_id = process.env.CLICK_SERVICE_ID || '24817';
const merchant_user_id = process.env.CLICK_MERCHANT_USER_ID || '';
const dbUrl = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.kszv0zh.mongodb.net/?retryWrites=true&w=majority`;

export { dbUrl, port, secret_token, bot_token, secret_key, merchant_user_id, service_id };
