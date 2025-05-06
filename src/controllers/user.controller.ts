import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import IUserRequest from "../interfaces/dtos/UserRequest";
import { encriptarContraseña, CompararContraseña } from "../service/EncryptService";


export const iniciarSesion = async (req: Request, res: Response) => {

    try {
        const { contraseña, correo } = req.body;

        if (!contraseña || !correo) {
            return res.status(400).json({
                msg: "Error, asegurate de mandar bien los datos del correo o contraseña",
                data: null
            });
        }




        const existeElUsuario = await userFindOne({correo})

        if (!existeElUsuario) {
            return res.status(404).json({
                msg: "Usuario no encontrado",
                data: null
            });
        }

        // Parámetros:
        // - contraseña: La contraseña proporcionada por el usuario al intentar iniciar sesión.
        // - existeElUsuario.contraseña: La contraseña almacenada en la base de datos (ya encriptada)

        const contraseñaIguales = await CompararContraseña(contraseña, existeElUsuario.contraseña);

        //codigo de estado 401 -> indica que no esta autorizado o 
        // porque las credenciales de autenticación no son correctas.
        
        if (!contraseñaIguales){
            return res.status(401).json({
                msg: "Credenciales Incorrectas",
                data: null
            })
        }

        return res.status(200).json({
            data: existeElUsuario,
            msg: "Credenciales Correctas"
        })

    } catch (error) {
        return res.status(500).json({
            data: null,
            msg: "Error interno del servidor"
        })
    }

}


export const agregarNuevoUsuario = async (req: Request, res: Response) => {
    try {
        const { nombre, correo, contraseña }: IUserRequest = req.body;

        if (!nombre || !correo || !contraseña) {
            return res.status(400).json({
                msg: "Error, asegurate de mandar bien los datos del correo, contraseña o nombre",
                data: null
            });
        }

        //verificar si el correo ya esta en uso:

        const emailExisted = await userFindOne({correo});

        if (emailExisted){
            return res.status(409).json({
                msg: "El correo electronico ya esta en uso",
                data: null
            })
        }

        const passwordEncriptado = await encriptarContraseña(contraseña)
        const newUser = await UserModel.create({ nombre, correo, contraseña: passwordEncriptado });

        return res.status(200).json({
            msg: "se ah creado un nuevo elemento",
            data: newUser
        })

    } catch (error) {

        return res.status(500).json({
            msg: "Error interno del servidor",
            data: null
        })

    }

}

export const getInfoUser = async (req: Request, res:Response) => {
    try {
        const { id } = req.params;
        const userInfo = await UserModel.findOne({
            where: { id },
            attributes: { exclude: ['contraseña'] }
        });

        if (!userInfo) {
            return res.status(404).json({
                msg: "Error, no se encontro el usuario",
                data: null
            })
        }

        return res.status(200).json({
            msg: "Informacion del usuario",
            data: userInfo
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: "Error interno del servidor",
            data: null
        })
    }
}


const userFindOne = async ({correo}: {correo: string}) => {

    const user = await UserModel.findOne({
        where: { correo }
    });

    return user;

}
