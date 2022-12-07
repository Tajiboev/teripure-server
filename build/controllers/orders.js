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
exports.removeOne = exports.one = exports.list = exports.create = void 0;
const order_1 = __importDefault(require("../models/order"));
const product_1 = __importDefault(require("../models/product"));
const coupon_1 = __importDefault(require("../models/coupon"));
const serverError_1 = __importDefault(require("../utils/serverError"));
const bot_1 = require("../bot");
const list = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_1.default.find().populate('product coupon').exec();
        res.status(200).json(orders);
    }
    catch (e) {
        return next(new serverError_1.default(500, 'Server error.'));
    }
});
exports.list = list;
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { product, quantity, name, address, phoneNumber, coupon } = req.body;
    try {
        const validProduct = yield product_1.default.findOne({ _id: product });
        if (!validProduct)
            return new serverError_1.default(404, 'Product not found.');
        const validCoupon = yield coupon_1.default.findOne({ code: coupon });
        const discount = (validCoupon === null || validCoupon === void 0 ? void 0 : validCoupon.discount) || 0;
        let preliminaryOrder = {
            product,
            quantity,
            name,
            phoneNumber,
            address,
            amount: Math.round(validProduct.price * (1 - discount))
        };
        if (validCoupon) {
            preliminaryOrder['coupon'] = validCoupon._id;
        }
        const order = yield order_1.default.create(preliminaryOrder);
        const populatedOrder = yield order.populate('product coupon').execPopulate();
        res.status(201).json(populatedOrder);
        (0, bot_1.notify)(populatedOrder);
    }
    catch (e) {
        return next(new serverError_1.default(500, 'Server error.'));
    }
});
exports.create = create;
const one = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    try {
        const order = yield order_1.default.findOne({ _id }).populate('product coupon').exec();
        if (!order)
            return next(new serverError_1.default(404, 'Order not found.'));
        res.status(200).json(order);
    }
    catch (e) {
        return next(new serverError_1.default(500, 'Server error.'));
    }
});
exports.one = one;
const removeOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    try {
        const { ok } = yield order_1.default.deleteOne({ _id }).exec();
        if (!ok)
            return new serverError_1.default(404, `Order with the id ${_id} not found`);
        res.sendStatus(200);
    }
    catch (e) {
        return next(new serverError_1.default(500, 'Server error.'));
    }
});
exports.removeOne = removeOne;
