"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.couponInput = void 0;
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
exports.couponInput = joi_1.default.object({
    code: joi_1.default.string().required(),
    discount: joi_1.default.number().min(0.01).max(1).required()
});
const couponCodeSchema = new mongoose_1.Schema({
    discount: { type: Number, required: true },
    code: { type: String, required: true }
}, { timestamps: true, versionKey: false });
exports.default = (0, mongoose_1.model)('coupon', couponCodeSchema);
