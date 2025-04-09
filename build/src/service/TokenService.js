"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarToken = exports.generarToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'tu_clave_secreta';
const EXPIRATION_TIME = '1h';
const generarToken = (usuarioId) => {
    try {
        const payload = { id: usuarioId };
        const token = jsonwebtoken_1.default.sign(payload, SECRET_KEY, { expiresIn: EXPIRATION_TIME });
        return token;
    }
    catch (error) {
        throw new Error('Error al generar el token');
    }
};
exports.generarToken = generarToken;
const validarToken = (token) => {
    try {
        jsonwebtoken_1.default.verify(token, SECRET_KEY);
        return true;
    }
    catch (error) {
        console.error('Token Invalido', error);
        return false;
    }
};
exports.validarToken = validarToken;
