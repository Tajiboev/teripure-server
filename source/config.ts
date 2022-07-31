import dotenv from 'dotenv';

const config = dotenv.config();
if (config.error || !config.parsed) throw config.error;
const env = config.parsed;

const dbUrl = `mongodb+srv://${env.MONGO_USERNAME}:${env.MONGO_PASSWORD}@cluster0.kszv0zh.mongodb.net/?retryWrites=true&w=majority`;
const port = env.PORT;
const secret_token = env.SECRET_TOKEN;

export { dbUrl, port, secret_token };
