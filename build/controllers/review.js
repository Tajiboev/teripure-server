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
exports.updateOne = exports.list = exports.create = void 0;
const review_1 = __importDefault(require("../models/review"));
const serverError_1 = __importDefault(require("../utils/serverError"));
const list = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield review_1.default.find().exec();
        res.status(200).json(reviews);
    }
    catch (e) {
        return next(new serverError_1.default(500, 'Server error'));
    }
});
exports.list = list;
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phoneNumber, text, rating } = req.body;
    try {
        const review = yield review_1.default.create({ name, phoneNumber, text, rating });
        res.status(201).json(review);
    }
    catch (e) {
        return next(new serverError_1.default(500, 'Server error'));
    }
});
exports.create = create;
const updateOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    const { isPublished } = req.body;
    try {
        let { ok } = yield review_1.default.updateOne({ _id }, { isPublished }).exec();
        if (!ok)
            return next(new serverError_1.default(404, `Review with the id ${_id} not found`));
        res.sendStatus(200);
    }
    catch (e) {
        return next(new serverError_1.default(500, 'Server error.'));
    }
});
exports.updateOne = updateOne;
