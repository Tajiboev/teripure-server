"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productInput = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = require("mongoose");
exports.productInput = joi_1.default.object({
    price: joi_1.default.number().required(),
    name: joi_1.default.string().required(),
    description: joi_1.default.string().required()
});
const productSchema = new mongoose_1.Schema({
    price: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true }
}, { timestamps: true, versionKey: false });
exports.default = (0, mongoose_1.model)('product', productSchema);
