"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TokenService_1 = require("../service/TokenService");
const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Asegúrate de mandar el token'
            });
        }
        const tokenParts = token.split(' ');
        if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
            return res.status(401).json({
                success: false,
                message: 'El token debe tener el prefijo "Bearer"'
            });
        }
        const tokenValue = tokenParts[1];
        (0, TokenService_1.validarToken)(tokenValue);
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Token inválido o expirado'
        });
    }
};
exports.default = authMiddleware;
