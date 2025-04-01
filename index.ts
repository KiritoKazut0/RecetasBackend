import 'dotenv/config'
import express from "express"
import cors from "cors"
import morgan from "morgan"
import sequelize_conexion from './src/config/databaseConection'
import RecetasModel from './src/models/RecetasModel'
import IngredientesModel from './src/models/IngredientesModel'
import PreparacionModel from './src/models/PreparacionModel'
import UserModel from './src/models/UserModel'

const app = express();
const PORT = parseInt(process.env['PORT'] || '3000');
app.use(express.json());
app.use(morgan('dev'));

app.use(cors({
    origin: "*"
}));


//aqui se inicializa la conexin con la base de datos 

async function conectDatabase() {
    try {
        await sequelize_conexion.authenticate()
        console.log("Conexión a la base de datos establecida correctamente.");

        // Crear tablas en el orden correcto
        await UserModel.sync({ force: true });
        await RecetasModel.sync({ force: true });
        await IngredientesModel.sync({ force: true });
        await PreparacionModel.sync({ force: true });
       

        console.log("Base de datos sincronizada correctamente.");
    } catch (error) {
        console.error("Error al conectar con la base de datos:", error);
       
    }
}

app.listen(PORT, async () => {
    await conectDatabase()
    console.log('Server Listening on port', PORT);

})



