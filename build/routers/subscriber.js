"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subscriber_1 = require("../controllers/subscriber");
const router = express_1.default.Router();
const validateBody_1 = __importDefault(require("../middleware/validateBody"));
const methodError_1 = __importDefault(require("../middleware/methodError"));
const subscriber_2 = require("../models/subscriber");
router
    .route('/')
    .post((0, validateBody_1.default)(subscriber_2.subscriberInput), subscriber_1.create)
    .get(subscriber_1.list)
    .all((0, methodError_1.default)({ allowed: ['POST', 'GET'] }));
exports.default = router;
