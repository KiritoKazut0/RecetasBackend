import 'dotenv/config'
import express from "express"
import cors from "cors"
import morgan from "morgan"
import sequelize_conexion from './src/config/databaseConection'
import RecetasModel from './src/models/RecetasModel'
import IngredientesModel from './src/models/IngredientesModel'
import PreparacionModel from './src/models/PreparacionModel'
import UserModel from './src/models/UserModel'
import userRoutes from './src/routes/users.route'
import recetasRoutes from "./src/routes/recetas.route"

const app = express();
const PORT = parseInt(process.env['PORT'] || '3000');
app.use(express.json());
app.use(morgan('dev'));
app.use('/users', userRoutes);
app.use('/recetas', recetasRoutes);

app.use(cors({
    origin: "*"
}));


//aqui se inicializa la conexin con la base de datos 

async function conectDatabase() {
  try {
    await sequelize_conexion.authenticate();
    console.log("Conexión a la base de datos establecida correctamente.");

   // RecetasModel tiene muchos IngredientesModel
RecetasModel.hasMany(IngredientesModel, {
  foreignKey: 'receta_id',
  onDelete: 'CASCADE',
  as: 'ingredientes' // <- necesario para usar include: 'ingredientes'
});

IngredientesModel.belongsTo(RecetasModel, {
  foreignKey: 'receta_id',
  as: 'receta'
});

// RecetasModel tiene muchos pasos de preparación
RecetasModel.hasMany(PreparacionModel, {
  foreignKey: 'receta_id',
  onDelete: 'CASCADE',
  as: 'preparacions' // <- necesario para include: 'preparacions'
});

PreparacionModel.belongsTo(RecetasModel, {
  foreignKey: 'receta_id',
  as: 'receta'
});

// RecetasModel pertenece a un usuario
RecetasModel.belongsTo(UserModel, {
  foreignKey: 'user_id',
  as: 'usuario'
});

UserModel.hasMany(RecetasModel, {
  foreignKey: 'user_id',
  as: 'recetas'
});


    // Sincronizar en el orden correcto
    await UserModel.sync();
    await RecetasModel.sync();
    await IngredientesModel.sync();
    await PreparacionModel.sync();

    console.log("Base de datos sincronizada correctamente.");
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
  }
}


app.listen(PORT, async () => {
    await conectDatabase()
    console.log('Server Listening on port', PORT);

})



