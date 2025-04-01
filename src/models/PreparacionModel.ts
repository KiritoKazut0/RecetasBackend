import sequelize_conexion from "../config/databaseConection";
import IPreparacion from "../interfaces/models/IPreparacion";
import { DataTypes, Model } from "sequelize";
import RecetasModel from "./Recetas";


class PreparacionModel extends Model <IPreparacion> implements IPreparacion {
    id?: string | undefined;
    receta_id!: string;
    paso!: string;
}

PreparacionModel.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
     },

     receta_id:{
        type: DataTypes.UUID,
        references: {
            model: RecetasModel,
            key: 'id'
        },
        allowNull: false
     },

     paso: {
        type: DataTypes.STRING(),
        allowNull: false
     }
} ,{
    tableName: "preparacion",
    timestamps: false,
    sequelize: sequelize_conexion
})

PreparacionModel.belongsTo(RecetasModel, {
    foreignKey: 'receta_id'
});

export default PreparacionModel;