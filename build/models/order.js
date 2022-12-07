"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderInput = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = require("mongoose");
exports.orderInput = joi_1.default.object({
    product: joi_1.default.string().required(),
    quantity: joi_1.default.number().integer().min(1).required(),
    name: joi_1.default.string().required(),
    phoneNumber: joi_1.default.string().pattern(new RegExp('^\\+998[0-9]{9}$')).required(),
    address: joi_1.default.string().required(),
    paymentMethod: joi_1.default.string().valid('cash', 'click').required(),
    coupon: joi_1.default.string().allow('').optional()
});
const orderSchema = new mongoose_1.Schema({
    product: { type: mongoose_1.Schema.Types.ObjectId, ref: 'product', required: true },
    quantity: { type: Number, required: true },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    merchant_prepare_id: { type: Number },
    coupon: { type: mongoose_1.Schema.Types.ObjectId, ref: 'coupon' },
    isPaid: { type: Boolean, required: true, default: false },
    paymentMethod: { type: String, enum: ['cash', 'click'], required: true, default: 'click' },
    status: { type: Number, enum: [-1, 0, 1], required: true, default: 0 }
}, { timestamps: true, versionKey: false });
exports.default = (0, mongoose_1.model)('order', orderSchema);
