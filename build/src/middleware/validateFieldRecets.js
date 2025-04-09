"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateFieldRecets = (req, res, next) => {
    const { id_usuario, nombre, descripcion, ingredientes, preparacion, tiempoPreparacion, tiempoCoccion, porciones, categoria, imagen } = req.body;
    const missingFields = [];
    if (!id_usuario)
        missingFields.push("id_usuario");
    if (!nombre)
        missingFields.push("nombre");
    if (!descripcion)
        missingFields.push("descripcion");
    if (!ingredientes)
        missingFields.push("ingredientes");
    if (!preparacion)
        missingFields.push("preparacion");
    if (!tiempoPreparacion)
        missingFields.push("tiempoPreparacion");
    if (!tiempoCoccion)
        missingFields.push("tiempoCoccion");
    if (!porciones)
        missingFields.push("porciones");
    if (!categoria)
        missingFields.push("categoria");
    if (!imagen)
        missingFields.push("imagen");
    if (missingFields.length > 0) {
        return res.status(400).json({
            message: "Faltan los siguientes campos requeridos:",
            missingFields
        });
    }
    // Validaciones específicas
    if (!Array.isArray(ingredientes) || ingredientes.some((ing) => !ing.nombre || !ing.cantidad)) {
        return res.status(400).json({
            message: "Los ingredientes deben ser un array de objetos con 'nombre' y 'cantidad'."
        });
    }
    if (!Array.isArray(preparacion) || preparacion.some((step) => typeof step !== "string")) {
        return res.status(400).json({
            message: "La preparación debe ser un array de strings."
        });
    }
    next();
};
exports.default = validateFieldRecets;
