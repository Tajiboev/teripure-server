"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriberInput = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = require("mongoose");
exports.subscriberInput = joi_1.default.object({
    email: joi_1.default.string().email().lowercase().required()
});
const subscriberSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: true, versionKey: false });
exports.default = (0, mongoose_1.model)('subscriber', subscriberSchema);
