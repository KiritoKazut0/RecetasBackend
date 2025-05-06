import sequelize_conexion from "../config/databaseConection";
import IReceta from "../interfaces/models/IRecetasModel";
import { DataTypes, Model } from "sequelize";
import IngredientesModel from "./IngredientesModel";
import PreparacionModel from "./PreparacionModel";
import UserModel from "./UserModel";
class RecetasModel extends Model <IReceta> implements IReceta {
    id?: string | undefined;
    user_id!: string;
    nombre!: string;
    descripcion!: string;
    tiempoCoccion!: string;
    tiempoPreparacion!: string;
    porciones!: string;
    categoria!: string;
    imagen!: string;
    tipo_suscripcion!: "Basico" | "Premium";
      // Relaciones para TypeScript
  ingredientes?: IngredientesModel[];
  preparacions?: PreparacionModel[];
}

RecetasModel.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },

    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: UserModel,
          key: 'id',
        }
      },

      tipo_suscripcion: {
        type: DataTypes.ENUM('Basico', 'Premium'),
        allowNull: false,
    
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
});



export default RecetasModel