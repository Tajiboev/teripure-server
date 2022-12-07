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
exports.createInvoice = exports.complete = exports.prepare = void 0;
const axios_1 = __importDefault(require("axios"));
const helpers_1 = require("../utils/helpers");
const config_1 = require("../config");
const order_1 = __importDefault(require("../models/order"));
const createInvoice = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, phone_number, merchant_trans_id } = req.body;
    const header = (0, helpers_1.createAuthHeader)();
    try {
        const response = yield axios_1.default.post('https://api.click.uz/v2/merchant/invoice/create', {
            service_id: config_1.service_id,
            amount,
            phone_number,
            merchant_trans_id
        }, {
            headers: { Auth: header, 'content-type': 'application/json', Accept: 'application/json' }
        });
        res.status(response.status).json(response.data);
    }
    catch (e) {
        next(e);
    }
});
exports.createInvoice = createInvoice;
const prepare = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { click_trans_id, merchant_trans_id, amount } = req.body;
    try {
        const order = yield order_1.default.findOne({ _id: merchant_trans_id });
        if (!order) {
            res.status(400).json({
                click_trans_id,
                merchant_trans_id,
                error: -5,
                error_note: 'User does not exist'
            });
            return;
        }
        if (order.amount !== amount) {
            res.status(400).json({
                click_trans_id,
                merchant_trans_id,
                error: -2,
                error_note: 'Incorrect parameter amount'
            });
            return;
        }
        if (order.isPaid) {
            res.status(400).json({
                click_trans_id,
                merchant_trans_id,
                error: -4,
                error_note: 'Already paid'
            });
            return;
        }
        const prepareId = Math.floor(100000 + Math.random() * 900000);
        order.merchant_prepare_id = prepareId;
        yield order.save();
        res.status(200).json({
            click_trans_id,
            merchant_trans_id,
            merchant_prepare_id: prepareId,
            error: 0,
            error_note: 'Success'
        });
    }
    catch (error) {
        next(error);
    }
});
exports.prepare = prepare;
const complete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { click_trans_id, merchant_trans_id, amount } = req.body;
    try {
        const order = yield order_1.default.findOne({ _id: merchant_trans_id });
        if (!order) {
            res.status(400).json({
                click_trans_id,
                merchant_trans_id,
                error: -5,
                error_note: 'User does not exist'
            });
            return next();
        }
        if (!order.merchant_prepare_id) {
            res.status(400).json({
                click_trans_id,
                merchant_trans_id,
                error: -6,
                error_note: 'Transaction does not exist'
            });
            return next();
        }
        if (order.isPaid) {
            res.status(400).json({
                click_trans_id,
                merchant_trans_id,
                error: -4,
                error_note: 'Already paid'
            });
            return next();
        }
        if (order.amount !== amount) {
            res.status(400).json({
                click_trans_id,
                merchant_trans_id,
                error: -2,
                error_note: 'Incorrect parameter amount'
            });
            return next();
        }
        order.isPaid = true;
        yield order.save();
        res.status(200).json({
            click_trans_id,
            merchant_trans_id,
            error: 0,
            error_note: 'Success'
        });
    }
    catch (error) {
        next(error);
    }
});
exports.complete = complete;
