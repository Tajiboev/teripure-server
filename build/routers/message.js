"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const message_1 = require("../controllers/message");
const router = express_1.default.Router();
const validateBody_1 = __importDefault(require("../middleware/validateBody"));
const methodError_1 = __importDefault(require("../middleware/methodError"));
const message_2 = require("../models/message");
router
    .route('/')
    .get(message_1.list)
    .post((0, validateBody_1.default)(message_2.messageInput), message_1.create)
    .all((0, methodError_1.default)({ allowed: ['POST', 'GET'] }));
exports.default = router;
