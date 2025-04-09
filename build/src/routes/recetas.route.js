"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recetas_controller_1 = require("../controllers/recetas.controller");
const validateFieldRecets_1 = __importDefault(require("../middleware/validateFieldRecets"));
const router = (0, express_1.Router)();
router.get('/:id', recetas_controller_1.listarRecetas);
router.post('/', validateFieldRecets_1.default, recetas_controller_1.crearReceta);
exports.default = router;
