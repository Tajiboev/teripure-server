"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const coupon_1 = require("../controllers/coupon");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const validateBody_1 = __importDefault(require("../middleware/validateBody"));
const methodError_1 = __importDefault(require("../middleware/methodError"));
const coupon_2 = require("../models/coupon");
router
    .route('/')
    .get(coupon_1.list)
    .post((0, validateBody_1.default)(coupon_2.couponInput), coupon_1.create)
    .all((0, methodError_1.default)({ allowed: ['POST', 'GET'] }));
router
    .route('/:_id')
    .get(coupon_1.one)
    .delete(coupon_1.removeOne)
    .all((0, methodError_1.default)({ allowed: ['GET', 'DETELE'] }));
exports.default = router;
