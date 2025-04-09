"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const databaseConection_1 = __importDefault(require("../config/databaseConection"));
const sequelize_1 = require("sequelize");
const RecetasModel_1 = __importDefault(require("./RecetasModel"));
class IngredientesModel extends sequelize_1.Model {
}
IngredientesModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    receta_id: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: RecetasModel_1.default,
            key: 'id'
        },
        allowNull: false
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(),
        allowNull: false
    },
    cantidad: {
        type: sequelize_1.DataTypes.STRING(),
        allowNull: false
    }
}, {
    tableName: "ingredientes",
    timestamps: false,
    sequelize: databaseConection_1.default
});
IngredientesModel.belongsTo(RecetasModel_1.default, { foreignKey: 'receta_id' });
exports.default = IngredientesModel;
