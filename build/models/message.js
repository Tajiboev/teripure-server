"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageInput = void 0;
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
exports.messageInput = joi_1.default.object({
    name: joi_1.default.string().required(),
    phoneNumber: joi_1.default.string().pattern(new RegExp('^\\+998[0-9]{9}$')).required(),
    text: joi_1.default.string().required()
});
const messageSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
}, { timestamps: true, versionKey: false });
exports.default = (0, mongoose_1.model)('message', messageSchema);
