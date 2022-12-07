"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const review_1 = require("../controllers/review");
const router = express_1.default.Router();
const validateBody_1 = __importDefault(require("../middleware/validateBody"));
const methodError_1 = __importDefault(require("../middleware/methodError"));
const review_2 = require("../models/review");
router
    .route('/')
    .post((0, validateBody_1.default)(review_2.reviewInput), review_1.create)
    .get(review_1.list)
    .all((0, methodError_1.default)({ allowed: ['POST', 'GET'] }));
router
    .route('/:_id')
    .patch(review_1.updateOne)
    .all((0, methodError_1.default)({ allowed: ['PATCH'] }));
exports.default = router;
