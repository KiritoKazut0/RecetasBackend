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
exports.CompararContraseña = exports.encriptarContraseña = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const encriptarContraseña = (contraseña) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const saltRounds = parseInt(process.env['SALT'] || '10', 10);
        if (isNaN(saltRounds) || saltRounds <= 0) {
            throw new Error('El valor de saltRounds no es válido. Asegúrate de que sea un número positivo.');
        }
        const salt = yield bcryptjs_1.default.genSalt(saltRounds);
        return yield bcryptjs_1.default.hash(contraseña, salt);
    }
    catch (error) {
        console.error('error al encriptar la contraseña:', error);
        throw new Error('error al encriptar la contraseña');
    }
});
exports.encriptarContraseña = encriptarContraseña;
const CompararContraseña = (contraseñaIngresada, contraseña) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!contraseña || !contraseñaIngresada) {
            throw new Error('Ambos campos, "contraseña" y "contraseña ingresada", son requeridos.');
        }
        return yield bcryptjs_1.default.compare(contraseñaIngresada, contraseña);
    }
    catch (error) {
        console.error('error:', error);
        throw new Error('Hubo un error al compara la contraseña');
    }
});
exports.CompararContraseña = CompararContraseña;
