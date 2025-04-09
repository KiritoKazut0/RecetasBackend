import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import IngredientesModel from "../models/IngredientesModel";
import RecetasModel from "../models/RecetasModel";
import PreparacionModel from "../models/PreparacionModel";
import RecetaResponse from "../interfaces/dtos/RecetasResponse";

//lista las recetas segun el plan de suscripcion 
export const listarRecetas = async (req: Request, res: Response) => {
    try {
        const idUser = req.params.id;
        const user = await UserModel.findByPk(idUser);

        if (!user) {
            return res.status(404).json({
                data: null,
                msg: "El usuario no existe"
            });
        }

        const ListaRecetas = await obtenerRecetasSegunSuscripcion(user.tipo_suscripcion);

        return res.status(200).json({
            msg: "list recet succefully",
            success: true,
            data: ListaRecetas
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            data: null,
            success: false,
            msg: "Internal Server Error"
        })
    }

}


export const crearReceta = async (req: Request, res: Response) => {
    try {
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
        imagen
      } = req.body;
  
      const receta = await RecetasModel.create({
        nombre,
        descripcion,
        tiempoPreparacion,
        tiempoCoccion,
        porciones,
        categoria,
        imagen,
        user_id: id_usuario,
        ingredientes: ingredientes.map((i: any) => ({
          nombre: i.nombre,
          cantidad: i.cantidad
        })),
        preparacions: preparacion.map((p: string) => ({ paso: p }))
      }, {
        include: [
          { model: IngredientesModel, as: 'ingredientes' },
          { model: PreparacionModel, as: 'preparacions' }
        ]
      });
  
      return res.status(201).json({
        msg: "Receta creada exitosamente",
        success: true,
        data: receta
      });
  
    } catch (error) {
      console.error("Error al crear la receta:", error);
      return res.status(500).json({
        msg: "Error al crear la receta",
        success: false
      });
    }
  };
  


async function obtenerRecetasSegunSuscripcion(tipo_suscripcion: string): Promise<RecetaResponse[] | null> {
    try {
        const whereCondition = tipo_suscripcion === "Premium"
            ? {} // Todas las recetas
            : { categoria: "Basico" }; // Solo recetas básicas

        const recetas = await RecetasModel.findAll({
            where: whereCondition,
            include: [
                {
                    model: IngredientesModel,
                    attributes: ['nombre', 'cantidad'],
                    as: 'ingredientes',
                },
                {
                    model: PreparacionModel,
                    attributes: ['paso'],
                    as: 'preparacions',
                }
            ]
        });

        const formatted = recetas.map((receta) => ({
            id: receta.id ?? "",
            id_user: receta.user_id,
            nombre: receta.nombre,
            descripcion: receta.descripcion,
            tiempoCoccion: receta.tiempoCoccion,
            tiempoPreparacion: receta.tiempoPreparacion,
            porciones: receta.porciones,
            categoria: receta.categoria,
            imagen: receta.imagen,

            ingredientes: receta.ingredientes?.map(i => ({ nombre: i.nombre, cantidad: i.cantidad })) ?? [],
            preparacion: receta.preparacions?.map(p => p.paso) ?? [],
        }));

        return formatted;
    } catch (error) {
        throw new Error(`Hubo un problema el obtener las recetas: ${error}`)
    }
};
