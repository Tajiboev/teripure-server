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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const product_1 = __importDefault(require("./routers/product"));
const order_1 = __importDefault(require("./routers/order"));
const subscriber_1 = __importDefault(require("./routers/subscriber"));
const review_1 = __importDefault(require("./routers/review"));
const message_1 = __importDefault(require("./routers/message"));
const coupon_1 = __importDefault(require("./routers/coupon"));
const payment_1 = __importDefault(require("./routers/payment"));
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
app.disable('etag');
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use((0, compression_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use('/products', product_1.default);
app.use('/orders', order_1.default);
app.use('/coupons', coupon_1.default);
app.use('/subscribers', subscriber_1.default);
app.use('/reviews', review_1.default);
app.use('/messages', message_1.default);
app.use('/payment', payment_1.default);
app.get('/healthcheck', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.sendStatus(200);
}));
app.use(errorHandler_1.notFound);
app.use(errorHandler_1.errorHandler);
exports.default = app;
