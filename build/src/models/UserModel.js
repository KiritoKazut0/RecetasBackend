"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const databaseConection_1 = __importDefault(require("../config/databaseConection"));
const sequelize_1 = require("sequelize");
class UserModel extends sequelize_1.Model {
}
UserModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    correo: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    contraseña: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false
    },
    tipo_suscripcion: {
        type: sequelize_1.DataTypes.ENUM("Basico", "Premium"),
        defaultValue: "Basico",
        allowNull: false
    }
}, {
    tableName: "users",
    timestamps: false,
    sequelize: databaseConection_1.default
});
exports.default = UserModel;
