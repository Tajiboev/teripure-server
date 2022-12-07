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
exports.list = exports.create = void 0;
const subscriber_1 = __importDefault(require("../models/subscriber"));
const serverError_1 = __importDefault(require("../utils/serverError"));
const list = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subscribers = yield subscriber_1.default.find().exec();
        res.status(200).json(subscribers);
    }
    catch (e) {
        return next(new serverError_1.default(500, 'Server error.'));
    }
});
exports.list = list;
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const subscriber = yield subscriber_1.default.create({ email });
        res.status(201).json(subscriber);
    }
    catch (e) {
        return next(new serverError_1.default(500, 'Server error.'));
    }
});
exports.create = create;
