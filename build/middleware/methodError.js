"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const methodError = (methods) => {
    return (req, res, next) => {
        const allowedMethods = methods.allowed.join(', ').trim();
        res.set('Allow', allowedMethods)
            .status(405)
            .json({ message: `${req.method} method for the ${req.originalUrl} route is not supported.` });
    };
};
exports.default = methodError;
