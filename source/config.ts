import dotenv from 'dotenv';

const config = dotenv.config();
if (config.error || !config.parsed) throw config.error;
const env = config.parsed;

const dbUrl = `mongodb+srv://${env.MONGO_USERNAME}:${env.MONGO_PASSWORD}@cluster0.9oliw.mongodb.net/${env.MONGO_DBNAME}?retryWrites=true&w=majority`;
const port = env.PORT;

export { dbUrl, port };
