import { Router } from "express";
import { iniciarSesion, agregarNuevoUsuario } from "../controllers/user.controller";

const router = Router();

router.post('/registrar', agregarNuevoUsuario);
router.post('/login', iniciarSesion);

export default router;  