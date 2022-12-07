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
exports.one = exports.list = exports.create = void 0;
const product_1 = __importDefault(require("../models/product"));
const serverError_1 = __importDefault(require("../utils/serverError"));
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price } = req.body;
    try {
        const product = yield product_1.default.create({
            name,
            description,
            price
        });
        res.status(201).json(product);
    }
    catch (e) {
        return next(new serverError_1.default(500, 'Server error'));
    }
});
exports.create = create;
const list = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.default.find().exec();
        res.status(200).json(products);
    }
    catch (e) {
        return next(new serverError_1.default(500, 'Server error'));
    }
});
exports.list = list;
const one = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    try {
        const product = yield product_1.default.findOne({ _id }).exec();
        if (!product)
            return next(new serverError_1.default(404, 'Product not found'));
        res.status(200).json(product);
    }
    catch (e) {
        return next(new serverError_1.default(500, 'Server error'));
    }
});
exports.one = one;
