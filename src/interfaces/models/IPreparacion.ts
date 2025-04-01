
export default interface IPreparacion {
    id?: string;
    receta_id: string;  // Referencia a la receta a la que pertenece
    paso: string;
  }
  