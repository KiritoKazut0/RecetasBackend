
export default interface IUserModels {
    id?: string,
    nombre: string,
    contraseña: string,
    correo: string,
    tipo_suscripcion?: 'Basico' | 'Premium',
    id_suscripcion?: string,
}