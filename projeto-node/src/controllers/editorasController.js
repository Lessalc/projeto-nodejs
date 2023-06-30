import NaoEncontrado from "../erros/NaoEncontrado.js";
import {editoras} from "../model/index.js";

class EditoraController{

  static listarEditoras = async (req, res, next) => {
    try{
      const editorasResultados =  await editoras.find();
      res.status(200).json(editorasResultados);
    } catch(err){
      next(err);
    }
  };

  static listarEditoraPorId = async (req, res, next) => {
    try{
      let id = req.params.id;
      const editoraResultados =  await editoras.findById(id);
      if (editoraResultados !== null)
        res.status(200).json(editoraResultados);
      else
        next(new NaoEncontrado("Id não foi encontrado"));
    } catch(err){
      next(err);
    }

  };
            
  static cadastrarEditora = async (req, res, next) => {
    try{
      let Editora = new editoras(req.body);
      const editoraResultados =  await Editora.save();
      res.status(200).send(editoraResultados.toJSON());
    } catch(err){
      next(err);
    }
  };

  static atualizarEditora = async (req, res, next) =>{
    try{
      let id = req.params.id;
      const editoraResultados =  await editoras.findByIdAndUpdate(id, {$set: req.body}, {new:true});

      if (editoraResultados !== null)
        res.status(200).send(editoraResultados.toJSON());
      else
        next(new NaoEncontrado("Editora não encontrada"));
    } catch(err){
      next(err);
    }
  };

  static deletaEditora = async (req, res, next) =>{
    try{
      let id = req.params.id;
      const editoraResultados = await editoras.findByIdAndDelete(id);
      if (editoraResultados !== null)
        res.status(200).json({message:"Editora excluída com sucesso!"});
      else
        next(new NaoEncontrado("Editora não encontrada"));
    } catch(err){
      next(err);
    }
  }; 
}

export default EditoraController;