"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServerError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, ServerError.prototype);
    }
}
exports.default = ServerError;
