import sequelize_conexion from "../config/databaseConection";
import IIngrediente from "../interfaces/models/Iingredientes";
import { DataTypes, Model } from "sequelize";
import RecetasModel from "./RecetasModel";

class IngredientesModel extends Model<IIngrediente> implements IIngrediente {
    id?: string | undefined;
    receta_id!: string;
    nombre!: string;
    cantidad!: string;
}


IngredientesModel.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
     },

     receta_id: {
        type: DataTypes.UUID,
        references: {
            model: RecetasModel,
            key: 'id'
        },
        allowNull: false
     },

     nombre: {
        type: DataTypes.STRING(),
        allowNull: false
     },

     cantidad: {
        type: DataTypes.STRING(),
        allowNull: false
     }
},{
    tableName: "ingredientes",
    timestamps: false,
    sequelize: sequelize_conexion
})

IngredientesModel.belongsTo(RecetasModel, { foreignKey: 'receta_id' });

export default IngredientesModel;