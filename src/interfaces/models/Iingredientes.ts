export default interface IIngrediente {
    id?: string;
    receta_id: string;  // Referencia a la receta a la que pertenece
    nombre: string;
    cantidad: string;
  }
  

