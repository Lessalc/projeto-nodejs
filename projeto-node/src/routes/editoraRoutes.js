import express from "express";
import EditoraController from "../controllers/editorasController.js";

const router = express.Router();

router
  .get("/editoras", EditoraController.listarEditoras)
  .get("/editoras/:id", EditoraController.listarEditoraPorId)
  .post("/editoras", EditoraController.cadastrarEditora)
  .put("/editoras/:id", EditoraController.atualizarEditora)
  .delete("/editoras/:id", EditoraController.deletaEditora);


export default router;