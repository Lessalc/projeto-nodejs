import express from "express";
import AutorController from "../controllers/autoresController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

router
  .get("/autores", AutorController.listarAutores, paginar)
  .get("/autores/:id", AutorController.listarAutoresPorId)
  .post("/autores", AutorController.cadastraAutor)
  .put("/autores/:id", AutorController.atualizarAutor)
  .delete("/autores/:id", AutorController.deletaAutor);

export default router;
