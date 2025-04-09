import { Router } from "express";
import { listarRecetas, crearReceta } from "../controllers/recetas.controller";
import validateFieldRecets from "../middleware/validateFieldRecets";

const router = Router();

router.get('/:id', listarRecetas );
router.post('/', validateFieldRecets, crearReceta);

export default router;