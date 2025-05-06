import { Router } from "express";
import { iniciarSesion, agregarNuevoUsuario, getInfoUser } from "../controllers/user.controller";

const router = Router();

router.post('/registrar', agregarNuevoUsuario);
router.post('/login', iniciarSesion);
router.get('/info/:id', getInfoUser);
export default router;  