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
const serverError_1 = __importDefault(require("../utils/serverError"));
const createInvoice = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { order } = req.body;
    try {
        const validOrder = yield order_1.default.findOne({ _id: order }).exec();
        if (!validOrder)
            return next(new serverError_1.default(400, 'Bad request.'));
        const header = (0, helpers_1.createAuthHeader)();
        const response = yield axios_1.default.post('https://api.click.uz/v2/merchant/invoice/create', {
            service_id: config_1.service_id,
            amount: validOrder.amount,
            phone_number: validOrder.phoneNumber,
            merchant_trans_id: order
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
    console.info('Prepare request: ');
    console.table({ click_trans_id, merchant_trans_id, amount });
    try {
        const order = yield order_1.default.findOne({ _id: merchant_trans_id }).exec();
        if (!order) {
            res.status(400).json({
                click_trans_id,
                merchant_trans_id,
                error: -5,
                error_note: 'Order does not exist'
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
        const merchant_prepare_id = Math.floor(100000 + Math.random() * 900000);
        const { ok } = yield order_1.default.updateOne({ _id: order._id }, { merchant_prepare_id }).exec();
        if (!ok)
            return next(new serverError_1.default(500, 'Server error'));
        res.status(200).json({
            click_trans_id,
            merchant_trans_id,
            merchant_prepare_id,
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
    console.info('Complete request: ');
    console.table({ click_trans_id, merchant_trans_id, amount });
    try {
        const order = yield order_1.default.findOne({ _id: merchant_trans_id }).exec();
        if (!order) {
            res.status(400).json({
                click_trans_id,
                merchant_trans_id,
                error: -5,
                error_note: 'Order does not exist'
            });
            return;
        }
        if (!order.merchant_prepare_id) {
            res.status(400).json({
                click_trans_id,
                merchant_trans_id,
                error: -6,
                error_note: 'Transaction does not exist'
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
        if (order.amount !== amount) {
            res.status(400).json({
                click_trans_id,
                merchant_trans_id,
                error: -2,
                error_note: 'Incorrect parameter amount'
            });
            return;
        }
        const { ok } = yield order_1.default.updateOne({ _id: order._id }, { isPaid: true }).exec();
        if (!ok)
            return next(new serverError_1.default(500, 'Server error'));
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
