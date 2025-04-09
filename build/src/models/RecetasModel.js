"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const databaseConection_1 = __importDefault(require("../config/databaseConection"));
const sequelize_1 = require("sequelize");
const UserModel_1 = __importDefault(require("./UserModel"));
class RecetasModel extends sequelize_1.Model {
}
RecetasModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    user_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: UserModel_1.default,
            key: 'id',
        }
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(),
        allowNull: false
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING(),
        allowNull: false
    },
    tiempoCoccion: {
        type: sequelize_1.DataTypes.STRING(),
        allowNull: false
    },
    tiempoPreparacion: {
        type: sequelize_1.DataTypes.STRING(),
        allowNull: false
    },
    porciones: {
        type: sequelize_1.DataTypes.STRING(),
        allowNull: false
    },
    categoria: {
        type: sequelize_1.DataTypes.STRING(),
        allowNull: false
    },
    imagen: {
        type: sequelize_1.DataTypes.STRING(),
        allowNull: false
    }
}, {
    tableName: "recetas",
    timestamps: false,
    sequelize: databaseConection_1.default
});
exports.default = RecetasModel;
