"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const click_1 = require("../controllers/click");
const validateBody_1 = __importDefault(require("../middleware/validateBody"));
const validationSchemas_1 = require("../utils/validationSchemas");
const methodError_1 = __importDefault(require("../middleware/methodError"));
const router = express_1.default.Router();
router
    .route('/click/createInvoice')
    .post((0, validateBody_1.default)(validationSchemas_1.createInvoiceSchema), click_1.createInvoice)
    .all((0, methodError_1.default)({ allowed: ['POST'] }));
router
    .route('/click/prepare')
    .post(click_1.prepare)
    .all((0, methodError_1.default)({ allowed: ['POST'] }));
router
    .route('/click/complete')
    .post(click_1.complete)
    .all((0, methodError_1.default)({ allowed: ['POST'] }));
exports.default = router;
