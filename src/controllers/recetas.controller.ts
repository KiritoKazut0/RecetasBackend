import { Request, Response } from "express";
import UserModel from "../models/UserModel";


//lista las recetas segun el plan de suscripcion 
export const listarRecetas = async (req: Request, res:Response) => {
    try {
        const idUser = req.params.id;
        const user = await UserModel.findByPk(idUser);

        if (!user){
            return res.status(404).json({
                data: null,
                msg: "El usuario no existe"
            });
        }

        if (user.tipo_suscripcion === "Premium"){
            // obtenemos todas las recetas tanto basico y premium 
        
        } else{
            //obtenemos las recetas de tipo basico (gratis)
        }
        
    } catch (error) {
        
    }

}



const obtenerRecetas = async (tipoPlan: string): Promise < null> => {
   return null
}