"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthHeader = void 0;
const crypto_1 = __importDefault(require("crypto"));
const config_1 = require("../config");
const createAuthHeader = () => {
    const timestamp = Math.floor(+new Date() / 1000);
    const data = timestamp + config_1.secret_key;
    const digest = crypto_1.default.createHash('sha1').update(data, 'binary').digest('hex');
    const header = `${config_1.merchant_user_id}:${digest}:${timestamp}`;
    return header;
};
exports.createAuthHeader = createAuthHeader;
