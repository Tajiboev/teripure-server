"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = require("../controllers/product");
const router = express_1.default.Router();
const validateBody_1 = __importDefault(require("../middleware/validateBody"));
const methodError_1 = __importDefault(require("../middleware/methodError"));
const product_2 = require("../models/product");
router
    .route('/')
    .get(product_1.list)
    .post((0, validateBody_1.default)(product_2.productInput), product_1.create)
    .all((0, methodError_1.default)({ allowed: ['POST'] }));
router
    .route('/:_id')
    .get(product_1.one)
    .all((0, methodError_1.default)({ allowed: ['GET'] }));
exports.default = router;
