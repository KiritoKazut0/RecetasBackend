"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const databaseConection_1 = __importDefault(require("./src/config/databaseConection"));
const RecetasModel_1 = __importDefault(require("./src/models/RecetasModel"));
const IngredientesModel_1 = __importDefault(require("./src/models/IngredientesModel"));
const PreparacionModel_1 = __importDefault(require("./src/models/PreparacionModel"));
const UserModel_1 = __importDefault(require("./src/models/UserModel"));
const users_route_1 = __importDefault(require("./src/routes/users.route"));
const recetas_route_1 = __importDefault(require("./src/routes/recetas.route"));
const app = (0, express_1.default)();
const PORT = parseInt(process.env['PORT'] || '3000');
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use('/users', users_route_1.default);
app.use('/recetas', recetas_route_1.default);
app.use((0, cors_1.default)({
    origin: "*"
}));
//aqui se inicializa la conexin con la base de datos 
function conectDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield databaseConection_1.default.authenticate();
            console.log("Conexión a la base de datos establecida correctamente.");
            // RecetasModel tiene muchos IngredientesModel
            RecetasModel_1.default.hasMany(IngredientesModel_1.default, {
                foreignKey: 'receta_id',
                onDelete: 'CASCADE',
                as: 'ingredientes' // <- necesario para usar include: 'ingredientes'
            });
            IngredientesModel_1.default.belongsTo(RecetasModel_1.default, {
                foreignKey: 'receta_id',
                as: 'receta'
            });
            // RecetasModel tiene muchos pasos de preparación
            RecetasModel_1.default.hasMany(PreparacionModel_1.default, {
                foreignKey: 'receta_id',
                onDelete: 'CASCADE',
                as: 'preparacions' // <- necesario para include: 'preparacions'
            });
            PreparacionModel_1.default.belongsTo(RecetasModel_1.default, {
                foreignKey: 'receta_id',
                as: 'receta'
            });
            // RecetasModel pertenece a un usuario
            RecetasModel_1.default.belongsTo(UserModel_1.default, {
                foreignKey: 'user_id',
                as: 'usuario'
            });
            UserModel_1.default.hasMany(RecetasModel_1.default, {
                foreignKey: 'user_id',
                as: 'recetas'
            });
            // Sincronizar en el orden correcto
            yield UserModel_1.default.sync();
            yield RecetasModel_1.default.sync();
            yield IngredientesModel_1.default.sync();
            yield PreparacionModel_1.default.sync();
            console.log("Base de datos sincronizada correctamente.");
        }
        catch (error) {
            console.error("Error al conectar con la base de datos:", error);
        }
    });
}
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield conectDatabase();
    console.log('Server Listening on port', PORT);
}));
