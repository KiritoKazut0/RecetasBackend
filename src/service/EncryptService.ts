import bcrypt from "bcryptjs"

export const encriptarContraseña = async (contraseña: string): Promise<string> => {
    try {
        const saltRounds = parseInt(process.env['SALT'] || '10', 10);

        if (isNaN(saltRounds) || saltRounds <= 0) {
            throw new Error('El valor de saltRounds no es válido. Asegúrate de que sea un número positivo.');
        }
        
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(contraseña, salt);
    } catch (error) {
        console.error('error al encriptar la contraseña:', error);
        throw new Error('error al encriptar la contraseña');
    }
};


export const CompararContraseña=  async (contraseñaIngresada: string, contraseña: string): Promise<boolean> => {
    try {

        if(!contraseña || !contraseñaIngresada){
            throw new Error('Ambos campos, "contraseña" y "contraseña ingresada", son requeridos.');
        }
        
        return await bcrypt.compare(contraseñaIngresada, contraseña);

    } catch (error) {
        console.error('error:', error);
        throw new Error('Hubo un error al compara la contraseña');
    }
}