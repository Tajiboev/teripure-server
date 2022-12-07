"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orders_1 = require("../controllers/orders");
const router = express_1.default.Router();
const validateBody_1 = __importDefault(require("../middleware/validateBody"));
const methodError_1 = __importDefault(require("../middleware/methodError"));
const order_1 = require("../models/order");
router
    .route('/')
    .get(orders_1.list)
    .post((0, validateBody_1.default)(order_1.orderInput), orders_1.create)
    .all((0, methodError_1.default)({ allowed: ['POST', 'GET'] }));
router
    .route('/:_id')
    .get(orders_1.one)
    .delete(orders_1.removeOne)
    .all((0, methodError_1.default)({ allowed: ['GET', 'DELETE'] }));
exports.default = router;
