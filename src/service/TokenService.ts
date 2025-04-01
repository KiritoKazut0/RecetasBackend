import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'tu_clave_secreta'; 
const EXPIRATION_TIME = '1h'; 


export const generarToken = (usuarioId: string): string => {
    try {
       
        const payload = { id: usuarioId };
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRATION_TIME });
        return token;
    } catch (error) {
        throw new Error('Error al generar el token');
    }
};


export const validarToken = (token: string): boolean => {
    try {
        
        jwt.verify(token, SECRET_KEY); 
        return true; 
    } catch (error) {
        console.error('Token Invalido', error);
        return false
    }
}
