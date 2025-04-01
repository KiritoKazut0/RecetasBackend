export default interface RecetaResponse {
    id: string,
    id_user: string;
    nombre: string;
    descripcion: string;
    ingredientes: { nombre: string; cantidad: string; }[];
    preparacion: string[];
    tiempoPreparacion: string;
    tiempoCoccion: string;
    porciones: string;
    categoria: string;
    imagen: string;
  }
  