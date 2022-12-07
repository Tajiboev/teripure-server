"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const config_1 = require("./config");
const bot_1 = require("./bot");
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const server = (0, http_1.createServer)(app_1.default);
mongoose_1.default
    .connect(config_1.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => {
    console.info('Connected to mongoDB');
    startServer();
})
    .catch((error) => {
    console.error('Unable to connect to mongoDB: ', error);
});
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    server.listen(config_1.port, () => __awaiter(void 0, void 0, void 0, function* () {
        console.info(`Server listening on port ${config_1.port}`);
    }));
    yield (0, bot_1.startBot)();
});
function shutdown() {
    return __awaiter(this, void 0, void 0, function* () {
        server.close(() => {
            console.info('HTTP server closed');
        });
        yield mongoose_1.default.disconnect();
        yield mongoose_1.default.connection.close();
    });
}
mongoose_1.default.connection.on('disconnected', () => {
    console.info('Mongoose disconnected');
});
process.on('SIGTERM', shutdown);
