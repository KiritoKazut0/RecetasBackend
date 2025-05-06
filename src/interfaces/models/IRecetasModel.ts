import IIngrediente from "./Iingredientes";
import IPreparacion from "./IPreparacion";

export default interface IReceta {
  id?: string;
  user_id: string;
  nombre: string;
  descripcion: string;
  tiempoPreparacion: string;
  tiempoCoccion: string;
  porciones: string;
  categoria: string;
  imagen: string;
  tipo_suscripcion: 'Basico' | 'Premium'
  ingredientes?: IIngrediente[];
  preparacions?: IPreparacion[];
}
