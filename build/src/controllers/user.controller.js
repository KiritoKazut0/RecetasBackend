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
exports.agregarNuevoUsuario = exports.iniciarSesion = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const EncryptService_1 = require("../service/EncryptService");
const iniciarSesion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contraseña, correo } = req.body;
        const existeElUsuario = yield UserModel_1.default.findOne({
            where: { correo }
        });
        if (!existeElUsuario) {
            return res.status(404).json({
                msg: "Usuario no encontrado",
                data: null
            });
        }
        // Parámetros:
        // - contraseña: La contraseña proporcionada por el usuario al intentar iniciar sesión.
        // - existeElUsuario.contraseña: La contraseña almacenada en la base de datos (ya encriptada)
        const contraseñaIguales = (0, EncryptService_1.CompararContraseña)(contraseña, existeElUsuario.contraseña);
        //codigo de estado 401 -> indica que no esta autorizado o 
        // porque las credenciales de autenticación no son correctas.
        if (!contraseñaIguales) {
            return res.status(401).json({
                msg: "Credenciales Incorrectas",
                data: null
            });
        }
        return res.status(200).json({
            data: existeElUsuario,
            msg: "Credenciales Correctas"
        });
    }
    catch (error) {
        return res.status(500).json({
            data: null,
            msg: "Error interno del servidor"
        });
    }
});
exports.iniciarSesion = iniciarSesion;
const agregarNuevoUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, correo, contraseña } = req.body;
        if (!nombre || !correo || !contraseña) {
            return res.status(400).json({
                msg: "Error, asegurate de mandar bien los datos del correo, contraseña o nombre",
                data: null
            });
        }
        const passwordEncriptado = yield (0, EncryptService_1.encriptarContraseña)(contraseña);
        const newUser = yield UserModel_1.default.create({ nombre, correo, contraseña: passwordEncriptado });
        return res.status(200).json({
            msg: "se ah creado un nuevo elemento",
            data: newUser
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: "Error interno del servidor",
            data: null
        });
    }
});
exports.agregarNuevoUsuario = agregarNuevoUsuario;
