import sequelize_conexion from "../config/databaseConection";
import IReceta from "../interfaces/models/IRecetasModel";
import { DataTypes, Model } from "sequelize";


class RecetasModel extends Model <IReceta> implements IReceta {
    id?: string | undefined;
    nombre!: string;
    descripcion!: string;
    tiempoCoccion!: string;
    tiempoPreparacion!: string;
    porciones!: string;
    categoria!: string;
    imagen!: string;
}

RecetasModel.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },

    nombre: {
        type: DataTypes.STRING(),
        allowNull: false
    },

    descripcion: {
        type: DataTypes.STRING(),
        allowNull: false
    },
    tiempoCoccion: {
        type: DataTypes.STRING(),
        allowNull: false
    },
    tiempoPreparacion: {
        type: DataTypes.STRING(),
        allowNull: false
    },

    porciones: {
        type: DataTypes.STRING(),
        allowNull: false
    },

    categoria: {
        type: DataTypes.STRING(),
        allowNull: false
    },

    imagen: {
        type: DataTypes.STRING(),
        allowNull: false
    }

}, {
    tableName: "recetas",
    timestamps: false,
    sequelize: sequelize_conexion
})

export default RecetasModel