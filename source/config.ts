const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const SECRET_TOKEN = process.env.SECRET_TOKEN;

const dbUrl = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.kszv0zh.mongodb.net/?retryWrites=true&w=majority`;
const port = process.env.PORT || 3000;
const secret_token = SECRET_TOKEN || 'ultrasafe secret token';

export { dbUrl, port, secret_token };
