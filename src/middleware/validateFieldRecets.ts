import { Request, Response, NextFunction } from "express";

const validateFieldRecets = (req: Request, res: Response, next: NextFunction) => {
  const {
    id_usuario,
    nombre,
    descripcion,
    ingredientes,
    preparacion,
    tiempoPreparacion,
    tiempoCoccion,
    porciones,
    categoria,
    imagen,
    tipo_suscripcion
  } = req.body;

  const missingFields: string[] = [];
  if(!id_usuario) missingFields.push("id_usuario");
  if (!nombre) missingFields.push("nombre");
  if (!descripcion) missingFields.push("descripcion");
  if (!ingredientes) missingFields.push("ingredientes");
  if (!preparacion) missingFields.push("preparacion");
  if (!tiempoPreparacion) missingFields.push("tiempoPreparacion");
  if (!tiempoCoccion) missingFields.push("tiempoCoccion");
  if (!porciones) missingFields.push("porciones");
  if (!categoria) missingFields.push("categoria");
  if (!imagen) missingFields.push("imagen");
  if(!tipo_suscripcion) missingFields.push("tipo_suscripcion")

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: "Faltan los siguientes campos requeridos:",
      missingFields
    });
  }

  // Validaciones específicas
  if (!Array.isArray(ingredientes) || ingredientes.some((ing: any) => !ing.nombre || !ing.cantidad)) {
    return res.status(400).json({
      message: "Los ingredientes deben ser un array de objetos con 'nombre' y 'cantidad'."
    });
  }

  if (!Array.isArray(preparacion) || preparacion.some((step: any) => typeof step !== "string")) {
    return res.status(400).json({
      message: "La preparación debe ser un array de strings."
    });
  }

  next();
};

export default validateFieldRecets;
