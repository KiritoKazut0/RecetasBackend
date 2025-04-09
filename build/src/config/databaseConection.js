"use strict";
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const NAME_DATABASE = (_a = process.env["NAME_DATABASE"]) !== null && _a !== void 0 ? _a : 'multi';
const USERNAME = (_b = process.env['USERNAME_DATABASE']) !== null && _b !== void 0 ? _b : 'root';
const PASSWORD = (_c = process.env['PASSWORD_DATABASE']) !== null && _c !== void 0 ? _c : "admin";
const HOST = (_d = process.env['HOST_DATABASE']) !== null && _d !== void 0 ? _d : 'localhost';
const PORT = parseInt((_e = process.env['PORT_DATABASE']) !== null && _e !== void 0 ? _e : "3306");
const sequelize_conexion = new sequelize_1.Sequelize(NAME_DATABASE, USERNAME, PASSWORD, {
    host: HOST,
    port: PORT,
    dialect: "mysql",
    logging: false
});
exports.default = sequelize_conexion;
