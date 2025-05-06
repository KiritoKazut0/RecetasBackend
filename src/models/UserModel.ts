import sequelize_conexion from "../config/databaseConection";
import IUserModels from "../interfaces/models/IUser";
import { DataTypes, Model} from "sequelize";


class UserModel extends Model<IUserModels> implements IUserModels {
    id?: string | undefined;
    nombre!: string;
    correo!: string;
    contraseña!: string;
   tipo_suscripcion!: "Basico" | "Premium";
   id_suscripcion?: string | undefined;
}

UserModel.init({
    id: {
       type: DataTypes.UUID,
       allowNull: false,
       primaryKey: true,
       defaultValue: DataTypes.UUIDV4
    },
    correo: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    contraseña: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(30),
        allowNull: false
    },

    tipo_suscripcion: {
        type: DataTypes.ENUM("Basico", "Premium"),
        defaultValue: "Basico",
        allowNull: false
    },
    id_suscripcion: {
        type: DataTypes.STRING(),
        allowNull: true
    }
},{
    tableName: "users",
    timestamps: false,
    sequelize: sequelize_conexion
});



export default UserModel