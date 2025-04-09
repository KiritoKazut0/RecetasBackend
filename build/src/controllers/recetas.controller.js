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
exports.crearReceta = exports.listarRecetas = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const IngredientesModel_1 = __importDefault(require("../models/IngredientesModel"));
const RecetasModel_1 = __importDefault(require("../models/RecetasModel"));
const PreparacionModel_1 = __importDefault(require("../models/PreparacionModel"));
//lista las recetas segun el plan de suscripcion 
const listarRecetas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idUser = req.params.id;
        const user = yield UserModel_1.default.findByPk(idUser);
        if (!user) {
            return res.status(404).json({
                data: null,
                msg: "El usuario no existe"
            });
        }
        const ListaRecetas = yield obtenerRecetasSegunSuscripcion(user.tipo_suscripcion);
        return res.status(200).json({
            msg: "list recet succefully",
            success: true,
            data: ListaRecetas
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            data: null,
            success: false,
            msg: "Internal Server Error"
        });
    }
});
exports.listarRecetas = listarRecetas;
const crearReceta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_usuario, nombre, descripcion, ingredientes, preparacion, tiempoPreparacion, tiempoCoccion, porciones, categoria, imagen } = req.body;
        const receta = yield RecetasModel_1.default.create({
            nombre,
            descripcion,
            tiempoPreparacion,
            tiempoCoccion,
            porciones,
            categoria,
            imagen,
            user_id: id_usuario,
            ingredientes: ingredientes.map((i) => ({
                nombre: i.nombre,
                cantidad: i.cantidad
            })),
            preparacions: preparacion.map((p) => ({ paso: p }))
        }, {
            include: [
                { model: IngredientesModel_1.default, as: 'ingredientes' },
                { model: PreparacionModel_1.default, as: 'preparacions' }
            ]
        });
        return res.status(201).json({
            msg: "Receta creada exitosamente",
            success: true,
            data: receta
        });
    }
    catch (error) {
        console.error("Error al crear la receta:", error);
        return res.status(500).json({
            msg: "Error al crear la receta",
            success: false
        });
    }
});
exports.crearReceta = crearReceta;
function obtenerRecetasSegunSuscripcion(tipo_suscripcion) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const whereCondition = tipo_suscripcion === "Premium"
                ? {} // Todas las recetas
                : { categoria: "Basico" }; // Solo recetas básicas
            const recetas = yield RecetasModel_1.default.findAll({
                where: whereCondition,
                include: [
                    {
                        model: IngredientesModel_1.default,
                        attributes: ['nombre', 'cantidad'],
                        as: 'ingredientes',
                    },
                    {
                        model: PreparacionModel_1.default,
                        attributes: ['paso'],
                        as: 'preparacions',
                    }
                ]
            });
            const formatted = recetas.map((receta) => {
                var _a, _b, _c, _d, _e;
                return ({
                    id: (_a = receta.id) !== null && _a !== void 0 ? _a : "",
                    id_user: receta.user_id,
                    nombre: receta.nombre,
                    descripcion: receta.descripcion,
                    tiempoCoccion: receta.tiempoCoccion,
                    tiempoPreparacion: receta.tiempoPreparacion,
                    porciones: receta.porciones,
                    categoria: receta.categoria,
                    imagen: receta.imagen,
                    ingredientes: (_c = (_b = receta.ingredientes) === null || _b === void 0 ? void 0 : _b.map(i => ({ nombre: i.nombre, cantidad: i.cantidad }))) !== null && _c !== void 0 ? _c : [],
                    preparacion: (_e = (_d = receta.preparacions) === null || _d === void 0 ? void 0 : _d.map(p => p.paso)) !== null && _e !== void 0 ? _e : [],
                });
            });
            return formatted;
        }
        catch (error) {
            throw new Error(`Hubo un problema el obtener las recetas: ${error}`);
        }
    });
}
;
